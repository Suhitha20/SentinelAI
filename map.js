/**
 * SENTINEL AI — GIS Disaster Mapping Engine
 * Uses Leaflet with custom operational vector overlays and clean line markers.
 */

class SentinelMapEngine {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.layers = {
      riskZones: L.layerGroup(),
      waterBodies: L.layerGroup(),
      rescueTeams: L.layerGroup(),
      shelters: L.layerGroup(),
      hospitals: L.layerGroup(),
      roads: L.layerGroup(),
      blockedRoads: L.layerGroup(),
      population: L.layerGroup(),
      historicalEvents: L.layerGroup()
    };
    this.isInitialized = false;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Center on Coimbatore urban disaster zone
    const centerCoords = [11.005, 76.975];

    this.map = L.map(this.containerId, {
      center: centerCoords,
      zoom: 13,
      zoomControl: true,
      attributionControl: false
    });

    // Clean, high-readability CartoDB Positron / OSM tiles (light gray operational background)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(this.map);

    // Build operational vector layers
    this.buildRiskZones();
    this.buildWaterBodies();
    this.buildRescueTeams();
    this.buildShelters();
    this.buildRoadsAndRoutes();
    this.buildBlockedRoads();

    // Attach layers according to initial state
    this.syncLayerVisibility();

    // Subscribe to state changes
    window.sentinelState.subscribe((state, event, payload) => {
      if (event === 'map_layer_toggle') {
        this.syncLayerVisibility();
      } else if (event === 'zone_selected') {
        this.highlightZone(payload);
      } else if (event === 'route_selected') {
        this.focusRoute(payload);
      }
    });

    this.isInitialized = true;

    // Invalidate size on initial layout rendering
    setTimeout(() => {
      if (this.map) this.map.invalidateSize();
    }, 250);
  }

  syncLayerVisibility() {
    if (!this.map) return;
    const layerStates = window.sentinelState.state.mapLayers;

    for (const [key, group] of Object.entries(this.layers)) {
      if (layerStates[key]) {
        if (!this.map.hasLayer(group)) {
          this.map.addLayer(group);
        }
      } else {
        if (this.map.hasLayer(group)) {
          this.map.removeLayer(group);
        }
      }
    }
  }

  buildRiskZones() {
    const zones = window.SENTINEL_DATA.zones;
    zones.forEach(zone => {
      let fillColor = '#CA8A04'; // Medium/watch
      let borderColor = '#CA8A04';
      let fillOpacity = 0.18;

      if (zone.riskLevel === 'HIGH') {
        fillColor = '#DC2626';
        borderColor = '#DC2626';
        fillOpacity = 0.24;
      }

      const polygon = L.polygon(zone.polygon, {
        color: borderColor,
        weight: 2,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        dashArray: zone.riskLevel === 'HIGH' ? null : '4, 4'
      });

      polygon.on('click', () => {
        window.sentinelState.selectZone(zone.id);
        window.openZoneDetailDrawer(zone.id);
      });

      // Simple, crisp popup
      polygon.bindTooltip(`
        <div style="font-family:Inter,sans-serif; font-size:11px; padding:2px;">
          <strong>${zone.name}</strong><br/>
          Risk Score: <b>${zone.riskScore}/100</b> (${zone.priority})
        </div>
      `, { sticky: true, className: 'clean-tooltip' });

      this.layers.riskZones.addLayer(polygon);
    });
  }

  buildWaterBodies() {
    const bodies = window.SENTINEL_DATA.waterBodies;
    bodies.forEach(body => {
      const waterIcon = L.divIcon({
        className: 'sentinel-marker-icon',
        html: `
          <div style="
            background: #FFFFFF;
            border: 2px solid ${body.status === 'WARNING' ? '#EA580C' : body.status === 'WATCH' ? '#CA8A04' : '#1D4ED8'};
            color: #1D4ED8;
            width: 28px;
            height: 28px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            cursor: pointer;
          ">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(body.coordinates, { icon: waterIcon });
      marker.on('click', () => {
        window.sentinelState.selectWater(body.id);
        window.openWaterDetailModal(body.id);
      });

      marker.bindTooltip(`
        <div style="font-family:Inter,sans-serif; font-size:11px;">
          <strong>${body.name}</strong><br/>
          Level: ${body.currentLevel} ${body.unit} (${body.capacityPercent}%)<br/>
          Status: <b>${body.status}</b>
        </div>
      `);

      this.layers.waterBodies.addLayer(marker);
    });
  }

  buildRescueTeams() {
    const teams = window.SENTINEL_DATA.rescueTeams;
    teams.forEach(team => {
      const teamIcon = L.divIcon({
        className: 'sentinel-marker-icon',
        html: `
          <div style="
            background: #111827;
            border: 1px solid #374151;
            color: #FFFFFF;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10.5px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.18);
            white-space: nowrap;
          ">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:${team.status === 'Active' ? '#16A34A' : '#EA580C'};"></span>
            ${team.name}
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12]
      });

      const marker = L.marker(team.coordinates, { icon: teamIcon });
      marker.on('click', () => {
        window.sentinelState.selectTeam(team.id);
        window.openRescueTeamModal(team.id);
      });

      this.layers.rescueTeams.addLayer(marker);
    });
  }

  buildShelters() {
    const shelters = window.SENTINEL_DATA.shelters;
    shelters.forEach(shelter => {
      const shelterIcon = L.divIcon({
        className: 'sentinel-marker-icon',
        html: `
          <div style="
            background: #FFFFFF;
            border: 2px solid #16A34A;
            color: #16A34A;
            width: 26px;
            height: 26px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.12);
            cursor: pointer;
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = L.marker(shelter.coordinates, { icon: shelterIcon });
      marker.on('click', () => {
        window.sentinelState.selectShelter(shelter.id);
        window.openShelterDetailModal(shelter.id);
      });

      marker.bindTooltip(`
        <div style="font-family:Inter,sans-serif; font-size:11px;">
          <strong>${shelter.name}</strong><br/>
          Cap: ${shelter.occupied}/${shelter.capacity} (Avail: ${shelter.available})
        </div>
      `);

      this.layers.shelters.addLayer(marker);
    });
  }

  buildRoadsAndRoutes() {
    const routes = window.SENTINEL_DATA.routes;
    routes.forEach(route => {
      const poly = L.polyline(route.polyline, {
        color: route.color,
        weight: route.isRecommended ? 5 : 3.5,
        opacity: route.isRecommended ? 0.9 : 0.65,
        dashArray: route.dashArray
      });

      poly.bindTooltip(`
        <div style="font-family:Inter,sans-serif; font-size:11px;">
          <strong>${route.name}</strong> (${route.travelTime})<br/>
          ${route.hazardLevel}
        </div>
      `);

      poly.on('click', () => {
        window.sentinelState.selectRoute(route.id);
        window.sentinelState.setView('routes');
      });

      this.layers.roads.addLayer(poly);
    });
  }

  buildBlockedRoads() {
    // Blocked marker at inundated section of Route R4
    const blockIcon = L.divIcon({
      className: 'sentinel-marker-icon',
      html: `
        <div style="
          background: #DC2626;
          color: #FFFFFF;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(220,38,38,0.4);
          font-size: 11px;
          font-weight: 700;
        ">
          ✕
        </div>
      `,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    const marker = L.marker([11.0020, 76.9840], { icon: blockIcon });
    marker.bindTooltip(`
      <div style="font-family:Inter,sans-serif; font-size:11px;">
        <strong>ROAD R4 BLOCKED</strong><br/>
        35cm flood water over roadway. Use Route R7.
      </div>
    `);

    this.layers.blockedRoads.addLayer(marker);
  }

  highlightZone(zoneId) {
    const zone = window.SENTINEL_DATA.zones.find(z => z.id === zoneId);
    if (zone && this.map) {
      this.map.flyTo(zone.coordinates, 14, { duration: 0.8 });
    }
  }

  focusRoute(routeId) {
    const route = window.SENTINEL_DATA.routes.find(r => r.id === routeId);
    if (route && this.map && route.polyline.length) {
      const bounds = L.latLngBounds(route.polyline);
      this.map.fitBounds(bounds, { padding: [40, 40] });
    }
  }

  resize() {
    if (this.map) {
      this.map.invalidateSize();
    }
  }
}

window.SentinelMapEngine = SentinelMapEngine;
