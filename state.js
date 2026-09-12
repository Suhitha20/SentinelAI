/**
 * SENTINEL AI — Central Reactive State Manager
 * Enhanced with Role-based Authentication, 38 TN Districts, GPS Weather, and Alarm/SMS
 */

class SentinelStateManager {
  constructor() {
    // Load persisted auth from localStorage if available
    const savedUser = localStorage.getItem('sentinel_user');
    const initialUser = savedUser ? JSON.parse(savedUser) : window.SENTINEL_DATA.users.official;

    this.state = {
      // Authentication & Roles
      auth: {
        isAuthenticated: true,
        user: initialUser,
        role: initialUser.role || 'official' // 'official' | 'volunteer'
      },

      // Tamil Nadu Monitored Location & GPS Telemetry
      location: {
        currentDistrictId: initialUser.assignedDistrict || 'Coimbatore',
        isUsingLiveGps: false,
        gpsCoords: [11.0168, 76.9558],
        temperature: 24.6,
        weatherCondition: "Heavy Inflow / Monsoon Active",
        rainfallRate: "28.4 mm/hr",
        humidity: 89
      },

      // Emergency Alarm & GPS SMS Broadcast System
      alarm: {
        isActive: false,
        type: 'post_disaster', // 'pre_disaster' | 'post_disaster'
        zone: 'Zone B2',
        radiusKm: 5,
        targetSubscribers: 14820,
        broadcastHistory: [
          {
            id: "SMS-INIT-01",
            timestamp: "20 mins ago",
            phase: "Pre-Disaster",
            zone: "Zone B2 (Singanallur)",
            radius: "5 km",
            recipients: 14820,
            deliveryRate: "99.8%",
            status: "Delivered via 12 Cell Towers"
          }
        ]
      },

      currentView: initialUser.role === 'volunteer' ? 'volunteer' : 'overview',
      selectedZoneId: 'B2',
      selectedWaterId: 'mettur',
      selectedShelterId: 'S3',
      selectedRouteId: 'R7',
      selectedTeamId: 'ALPHA-01',

      volunteer: {
        status: 'Available',
        capabilities: ['Evacuation', 'Food & Water', 'Medical Support'],
        activeAssignment: null
      },

      mapLayers: {
        riskZones: true,
        waterBodies: true,
        rescueTeams: true,
        shelters: true,
        hospitals: false,
        roads: true,
        blockedRoads: true,
        population: false,
        historicalEvents: false
      },

      alerts: [
        {
          id: 'ALT-01',
          type: 'critical',
          title: 'Zone B2 Promoted to P1',
          text: 'Water level rising rapidly (+1.8m in 6h). 1,240 people at risk.',
          time: '2 mins ago',
          zone: 'B2'
        },
        {
          id: 'ALT-02',
          type: 'warning',
          title: 'Road R4 Impassable',
          text: 'Low-lying canal corridor submerged by 35cm flood water. Diversion via R7 active.',
          time: '7 mins ago',
          route: 'R4'
        },
        {
          id: 'ALT-03',
          type: 'warning',
          title: 'Shelter S2 Approaching Capacity',
          text: '276 of 300 spots occupied (92%). Diverting new evacuees to Shelter S3.',
          time: '14 mins ago',
          shelter: 'S2'
        }
      ],

      aiAssistantOpen: false,
      aiChat: [
        {
          sender: 'assistant',
          text: 'SENTINEL Operational Assistant online. Ready to support tactical queries for Tamil Nadu Disaster Command.',
          sources: ['Live Telemetry V4.2', 'NDRF Protocol 2024']
        }
      ],

      telemetryTick: 0
    };

    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, payload) {
    for (const listener of this.listeners) {
      try {
        listener(this.state, event, payload);
      } catch (err) {
        console.error("Listener error:", err);
      }
    }
  }

  // ─────────────────────────────────────────────
  // AUTHENTICATION & PROFILE METHODS
  // ─────────────────────────────────────────────
  login(email, password, forcedRole) {
    let matchedUser = null;
    const users = window.SENTINEL_DATA.users;

    if (forcedRole === 'official' || email.toLowerCase().includes('officer') || email.toLowerCase().includes('tnsdma')) {
      matchedUser = { ...users.official, email: email || users.official.email };
    } else if (forcedRole === 'volunteer' || email.toLowerCase().includes('volunteer')) {
      matchedUser = { ...users.volunteer, email: email || users.volunteer.email };
    } else {
      // Default fallback
      matchedUser = {
        email: email,
        password: password,
        name: email.split('@')[0],
        dob: "1990-01-01",
        designation: "Disaster Response Personnel",
        officialId: "TNSDMA-USR-" + Math.floor(1000 + Math.random() * 9000),
        role: "official",
        assignedDistrict: "Coimbatore"
      };
    }

    this.state.auth.isAuthenticated = true;
    this.state.auth.user = matchedUser;
    this.state.auth.role = matchedUser.role;
    this.state.currentView = matchedUser.role === 'volunteer' ? 'volunteer' : 'overview';

    localStorage.setItem('sentinel_user', JSON.stringify(matchedUser));
    this.notify('auth_login', matchedUser);
  }

  logout() {
    this.state.auth.isAuthenticated = false;
    this.state.auth.user = null;
    this.state.auth.role = null;
    localStorage.removeItem('sentinel_user');

    if (this.state.alarm.isActive) {
      this.silenceAlarm();
    }

    this.notify('auth_logout', null);
  }

  updateProfile(updatedFields) {
    if (!this.state.auth.user) return;
    this.state.auth.user = {
      ...this.state.auth.user,
      ...updatedFields
    };
    localStorage.setItem('sentinel_user', JSON.stringify(this.state.auth.user));
    this.notify('profile_updated', this.state.auth.user);
  }

  // ─────────────────────────────────────────────
  // DISTRICT & GPS WEATHER METHODS
  // ─────────────────────────────────────────────
  setDistrict(districtId) {
    const dist = window.SENTINEL_DATA.tamilNaduDistricts.find(d => d.id === districtId);
    if (!dist) return;

    this.state.location.currentDistrictId = dist.id;
    this.state.location.isUsingLiveGps = false;
    this.state.location.gpsCoords = dist.coords;
    this.state.location.temperature = dist.temp;
    this.state.location.weatherCondition = dist.weather;
    this.state.location.rainfallRate = dist.rainRate;
    this.state.location.humidity = dist.humidity;

    this.notify('district_changed', dist);
  }

  detectGpsWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(4));
          const lng = parseFloat(pos.coords.longitude.toFixed(4));
          this.state.location.isUsingLiveGps = true;
          this.state.location.gpsCoords = [lat, lng];

          // Realistic live synthetic weather derived from coordinates
          const simulatedTemp = (25.0 + ((lat * 10) % 6)).toFixed(1);
          this.state.location.temperature = parseFloat(simulatedTemp);
          this.state.location.weatherCondition = "GPS Live: Coastal Monsoon Active";
          this.state.location.rainfallRate = "24.5 mm/hr";

          this.notify('gps_detected', { lat, lng, temp: this.state.location.temperature });
        },
        (err) => {
          console.warn("Geolocation denied or unavailable:", err.message);
          // Fall back to district
          this.setDistrict(this.state.location.currentDistrictId);
          this.notify('gps_fallback', this.state.location);
        },
        { timeout: 5000 }
      );
    }
  }

  // ─────────────────────────────────────────────
  // EMERGENCY ALARM & GPS SMS BROADCAST
  // ─────────────────────────────────────────────
  triggerAlarm(type = 'post_disaster', zone = 'Zone B2') {
    this.state.alarm.isActive = true;
    this.state.alarm.type = type;
    this.state.alarm.zone = zone;

    // Start Web Audio emergency siren
    if (window.sentinelAudio) {
      window.sentinelAudio.playAlarm(type);
    }

    this.notify('alarm_triggered', { type, zone });
  }

  silenceAlarm() {
    this.state.alarm.isActive = false;
    if (window.sentinelAudio) {
      window.sentinelAudio.stopAlarm();
    }
    this.notify('alarm_silenced', null);
  }

  broadcastEmergencySms(zone, radiusKm, customMessage) {
    const subscribers = Math.round(radiusKm * 2964); // ~3,000 people per km radius in urban TN
    const template = this.state.alarm.type === 'pre_disaster' 
      ? window.SENTINEL_DATA.smsTemplates.pre_disaster 
      : window.SENTINEL_DATA.smsTemplates.post_disaster;

    const newBroadcast = {
      id: "SMS-" + Date.now().toString().slice(-4),
      timestamp: "Just now",
      phase: this.state.alarm.type === 'pre_disaster' ? 'Pre-Disaster Early Warning' : 'Post-Disaster Evacuation',
      zone: zone || this.state.alarm.zone,
      radius: `${radiusKm} km`,
      recipients: subscribers,
      deliveryRate: "99.4%",
      status: `Dispatched across ${Math.max(4, Math.round(radiusKm * 2.5))} Cell Towers`,
      messageEnglish: customMessage || template.english,
      messageTamil: template.tamil
    };

    this.state.alarm.broadcastHistory.unshift(newBroadcast);
    this.notify('sms_broadcast_sent', newBroadcast);
    return newBroadcast;
  }

  // Standard Navigation
  setView(viewName) {
    if (this.state.currentView === viewName) return;
    this.state.currentView = viewName;
    this.notify('view_change', viewName);
  }

  selectZone(zoneId) {
    this.state.selectedZoneId = zoneId;
    this.notify('zone_selected', zoneId);
  }

  selectWater(waterId) {
    this.state.selectedWaterId = waterId;
    this.notify('water_selected', waterId);
  }

  selectShelter(shelterId) {
    this.state.selectedShelterId = shelterId;
    this.notify('shelter_selected', shelterId);
  }

  selectRoute(routeId) {
    this.state.selectedRouteId = routeId;
    this.notify('route_selected', routeId);
  }

  selectTeam(teamId) {
    this.state.selectedTeamId = teamId;
    this.notify('team_selected', teamId);
  }

  toggleMapLayer(layerKey) {
    if (this.state.mapLayers[layerKey] !== undefined) {
      this.state.mapLayers[layerKey] = !this.state.mapLayers[layerKey];
      this.notify('map_layer_toggle', { layer: layerKey, active: this.state.mapLayers[layerKey] });
    }
  }

  setVolunteerStatus(newStatus) {
    this.state.volunteer.status = newStatus;
    this.notify('volunteer_status_change', newStatus);
  }

  toggleCapability(cap) {
    const caps = this.state.volunteer.capabilities;
    const index = caps.indexOf(cap);
    if (index > -1) {
      caps.splice(index, 1);
    } else {
      caps.push(cap);
    }
    this.notify('volunteer_caps_change', caps);
  }

  acceptVolunteerTask(taskId) {
    const task = window.SENTINEL_DATA.volunteerTasks.find(t => t.id === taskId);
    if (!task) return;

    task.accepted = true;
    this.state.volunteer.status = 'Assigned';
    this.state.volunteer.activeAssignment = {
      ...task,
      acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      volunteerGroup: 'Volunteer Group 04',
      routeDistance: '2.4 km',
      routeEstTime: '~8 min',
      peopleRemaining: task.peopleAffected,
      commandContact: 'VHF Ch-04 / Emergency Control +91 422 2300100'
    };
    this.notify('volunteer_task_accepted', this.state.volunteer.activeAssignment);
  }

  completeVolunteerTask() {
    if (!this.state.volunteer.activeAssignment) return;
    const taskId = this.state.volunteer.activeAssignment.id;
    const task = window.SENTINEL_DATA.volunteerTasks.find(t => t.id === taskId);
    if (task) task.accepted = false;

    this.state.volunteer.activeAssignment = null;
    this.state.volunteer.status = 'Available';
    this.notify('volunteer_task_completed', taskId);
  }

  updateRescueTeamStatus(teamId, newStatus, newAssignment) {
    const team = window.SENTINEL_DATA.rescueTeams.find(t => t.id === teamId);
    if (team) {
      team.status = newStatus;
      if (newAssignment) team.assignment = newAssignment;
      this.notify('rescue_team_updated', team);
    }
  }

  assignEvacueesToShelter(shelterId, count) {
    const shelter = window.SENTINEL_DATA.shelters.find(s => s.id === shelterId);
    if (shelter) {
      shelter.occupied = Math.min(shelter.capacity, shelter.occupied + count);
      shelter.available = Math.max(0, shelter.capacity - shelter.occupied);
      if (shelter.available < 20) {
        shelter.status = 'At Capacity';
        shelter.risk = 'High';
      }
      this.notify('shelter_evacuees_assigned', shelter);
    }
  }

  toggleAiAssistant(forceState) {
    this.state.aiAssistantOpen = forceState !== undefined ? forceState : !this.state.aiAssistantOpen;
    this.notify('ai_toggle', this.state.aiAssistantOpen);
  }

  sendAiQuery(queryText) {
    this.state.aiChat.push({
      sender: 'user',
      text: queryText
    });
    this.notify('ai_query_sent', queryText);

    setTimeout(() => {
      let reply = "";
      let sources = [];
      let actionRecommendation = null;

      const q = queryText.toLowerCase();
      if (q.includes("zone b2") || q.includes("b2")) {
        reply = "Zone B2 is currently designated Priority 1 (P1). Noyyal feeder overflow has raised risk to 81/100, impacting 1,240 people. District Hospital Annex is in the inundation perimeter.";
        sources = ["Noyyal Basin Gauge (6.8m)", "Risk Matrix Model P1-TamilNadu", "District Census Geo-DB"];
        actionRecommendation = {
          title: "Recommended Action for Zone B2",
          steps: [
            "Deploy Team Alpha 01 & Alpha 02 via Route R7",
            "Prepare Shelter S2 for immediate vulnerable intake",
            "Trigger GPS Emergency SMS evacuation broadcast for surrounding 5km radius"
          ],
          actionType: "deploy_b2"
        };
      } else if (q.includes("sms") || q.includes("alarm") || q.includes("alert")) {
        reply = "Emergency Alert and GPS SMS broadcasting active across Tamil Nadu. Use the Emergency Alarm & Broadcast panel to transmit geo-fenced cell broadcast SMS in English & Tamil to civilians.";
        sources = ["TNSDMA Cell Broadcast Gateway", "DoT Disaster Alert System"];
      } else if (q.includes("route") || q.includes("r7") || q.includes("r4")) {
        reply = "Route R7 (Elevated Bypass, 11 min) is the designated safe corridor. Route R4 (Canal Road, 8 min) is currently blocked by 35cm flowing flood water and declared non-navigable for light vehicles.";
        sources = ["Traffic Police Telemetry", "Zone B2 Forward Scout #4"];
      } else if (q.includes("shelter") || q.includes("capacity")) {
        reply = "Shelter S3 (Indoor Sports Stadium) currently has the highest intake capacity (379 slots available). Shelter S2 is at 92% capacity (24 slots remaining). Direct all new convoys to S3.";
        sources = ["Shelter Management Roster API", "Ward 12 Volunteer Logs"];
      } else if (q.includes("water") || q.includes("mettur") || q.includes("dam")) {
        reply = "Mettur Dam water level is at 112.4m (82% capacity), rising at +0.30 m/hr. Noyyal River Basin is in WARNING status at 6.8m (91% capacity). Downstream zones B2 and C1 should maintain high alert.";
        sources = ["State Water Resources Dept", "Sensor Hydro-Array S-09"];
      } else {
        reply = `Situational query logged. System is operating at Level 2 Elevated Response for ${this.state.location.currentDistrictId} District. All response units are actively reporting via VHF Ch-04/05 and live telemetry.`;
        sources = ["SENTINEL Command Core"];
      }

      this.state.aiChat.push({
        sender: 'assistant',
        text: reply,
        sources: sources,
        actionRecommendation: actionRecommendation
      });
      this.notify('ai_response_received', reply);
    }, 450);
  }

  tickTelemetry() {
    this.state.telemetryTick++;
    if (this.state.telemetryTick % 5 === 0) {
      const mettur = window.SENTINEL_DATA.waterBodies.find(w => w.id === 'mettur');
      if (mettur && mettur.currentLevel < 114.0) {
        mettur.currentLevel = parseFloat((mettur.currentLevel + 0.02).toFixed(2));
      }
      this.notify('telemetry_tick', this.state.telemetryTick);
    }
  }
}

window.sentinelState = new SentinelStateManager();
