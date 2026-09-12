/**
 * SENTINEL AI — Main Application Orchestrator & View Controller
 * Enhanced with Login Flow, All 38 TN Districts, GPS Weather, Alarm Siren, and SMS Control
 */

document.addEventListener('DOMContentLoaded', () => {
  window.initSentinelApp();
});

window.initSentinelApp = function() {
  // Set up navigation listeners
  setupSidebarNavigation();

  // Set up header time & heartbeat
  setupTelemetryHeartbeat();

  // Initialize AI assistant panel
  if (window.initAiAssistant) {
    window.initAiAssistant();
  }

  // Set up district selector options
  populateDistrictSelector();

  // Subscribe state manager to route views & auth
  window.sentinelState.subscribe((state, event, payload) => {
    if (event === 'view_change' || event === 'auth_login' || event === 'auth_logout' || event === 'profile_updated') {
      window.renderCurrentView();
      updateHeaderProfile();
    } else if (event === 'district_changed' || event === 'gps_detected' || event === 'gps_fallback') {
      updateHeaderWeather();
      updateDistrictSelector();
      if (state.currentView === 'overview' || state.currentView === 'alarmSms') {
        window.renderCurrentView();
      }
    } else if (event === 'alarm_triggered' || event === 'alarm_silenced') {
      updateAlarmBanner();
      if (state.currentView === 'alarmSms') {
        window.renderCurrentView();
      }
    }
  });

  // Initial header updates
  updateHeaderProfile();
  updateHeaderWeather();
  updateAlarmBanner();

  // Initial render
  window.renderCurrentView();
};

function setupSidebarNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      window.sentinelState.setView(targetView);
    });
  });
}

function populateDistrictSelector() {
  const select = document.getElementById('district-selector');
  if (!select) return;

  const districts = window.SENTINEL_DATA.tamilNaduDistricts;
  const current = window.sentinelState.state.location.currentDistrictId;

  select.innerHTML = districts.map(d => `
    <option value="${d.id}" ${d.id === current ? 'selected' : ''}>
      ${d.name} (${d.risk} Risk)
    </option>
  `).join('');

  select.addEventListener('change', (e) => {
    window.sentinelState.setDistrict(e.target.value);
    window.showToast(`Monitored district changed to ${e.target.value}. Telemetry re-indexed.`, "info");
  });
}

function updateDistrictSelector() {
  const select = document.getElementById('district-selector');
  if (select) {
    select.value = window.sentinelState.state.location.currentDistrictId;
  }
}

function updateHeaderWeather() {
  const weatherEl = document.getElementById('header-gps-weather');
  if (!weatherEl) return;

  const loc = window.sentinelState.state.location;
  weatherEl.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
    <span class="weather-temp">${loc.temperature}°C</span>
    <span class="weather-condition">${loc.weatherCondition}</span>
    <span style="font-size:10px; color:var(--primary); text-transform:uppercase; font-weight:700;">
      ${loc.isUsingLiveGps ? '● Live GPS' : '● ' + loc.currentDistrictId}
    </span>
  `;
}

function updateHeaderProfile() {
  const profileName = document.getElementById('header-profile-name');
  const profileRole = document.getElementById('header-profile-role');
  const avatar = document.getElementById('header-avatar');
  const roleBadge = document.getElementById('sidebar-role-badge');
  const alarmNavItem = document.getElementById('nav-alarm-sms');

  const auth = window.sentinelState.state.auth;
  if (!auth.isAuthenticated || !auth.user) return;

  if (profileName) profileName.innerText = auth.user.name;
  if (profileRole) profileRole.innerText = auth.user.role === 'official' ? 'Higher Official' : 'Field Volunteer';
  if (avatar) avatar.innerText = auth.user.role === 'official' ? 'HO' : 'VOL';
  if (roleBadge) {
    roleBadge.innerText = auth.user.role === 'official' ? 'OFFICIAL' : 'VOLUNTEER';
    roleBadge.className = auth.user.role === 'official' ? 'badge badge-p1' : 'badge badge-normal';
  }

  // Hide or show official-only views in sidebar
  if (alarmNavItem) {
    alarmNavItem.style.display = auth.user.role === 'official' ? 'flex' : 'none';
  }
}

function updateAlarmBanner() {
  const banner = document.getElementById('top-alarm-banner');
  if (!banner) return;

  const alarm = window.sentinelState.state.alarm;
  if (alarm.isActive) {
    banner.style.display = 'flex';
    banner.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:14px;">🚨</span>
        <span>EMERGENCY DISASTER ALARM ACTIVE (${alarm.type === 'pre_disaster' ? 'PRE-DISASTER EARLY WARNING' : 'POST-DISASTER EVACUATION ORDER'}) — ${alarm.zone}</span>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <button class="btn btn-sm btn-secondary" onclick="window.sentinelState.setView('alarmSms')">
          Open GPS SMS Console &rarr;
        </button>
        <button class="btn btn-sm btn-secondary" style="background:#fff; color:var(--risk-red);" onclick="window.silenceEmergencyAlarm()">
          Silence Siren
        </button>
      </div>
    `;
  } else {
    banner.style.display = 'none';
  }
}

window.renderCurrentView = function() {
  const auth = window.sentinelState.state.auth;
  const appRoot = document.getElementById('app-root');
  const contentArea = document.getElementById('main-content-area');
  const sidebar = document.querySelector('.app-sidebar');
  const header = document.querySelector('.app-header');

  // Handle Unauthenticated / Logged Out state
  if (!auth.isAuthenticated) {
    if (sidebar) sidebar.style.display = 'none';
    if (header) header.style.display = 'none';
    if (contentArea) {
      contentArea.classList.add('no-padding');
      contentArea.innerHTML = window.renderLoginView();
    }
    return;
  } else {
    if (sidebar) sidebar.style.display = 'flex';
    if (header) header.style.display = 'flex';
  }

  const viewName = window.sentinelState.state.currentView;
  if (!contentArea) return;

  // Update active state in sidebar
  document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });

  // Handle no-padding for full GIS map view
  if (viewName === 'liveMap') {
    contentArea.classList.add('no-padding');
  } else {
    contentArea.classList.remove('no-padding');
  }

  // Render view template
  let html = '';
  switch (viewName) {
    case 'overview':
      html = window.renderOverviewView();
      break;
    case 'liveMap':
      html = window.renderLiveMapView();
      break;
    case 'riskZones':
      html = window.renderRiskZonesView();
      break;
    case 'waterLevels':
      html = window.renderWaterView();
      break;
    case 'volunteer':
      html = window.renderVolunteerView();
      break;
    case 'rescueTeams':
      html = window.renderRescueTeamsView();
      break;
    case 'rescuePriority':
      html = window.renderRescuePriorityView();
      break;
    case 'shelters':
      html = window.renderSheltersView();
      break;
    case 'routes':
      html = window.renderRoutesView();
      break;
    case 'alarmSms':
      html = window.renderAlarmSmsView();
      break;
    case 'recovery':
      html = window.renderRecoveryView();
      break;
    case 'historical':
      html = window.renderHistoricalView();
      break;
    case 'settings':
      html = window.renderSettingsView();
      break;
    case 'help':
      html = renderHelpView();
      break;
    default:
      html = window.renderOverviewView();
  }

  contentArea.innerHTML = html;

  // Reinitialize / render maps if present
  if (viewName === 'overview') {
    setTimeout(() => {
      window.sentinelMap = new window.SentinelMapEngine('overview-map-container');
      window.sentinelMap.init();
    }, 50);
  } else if (viewName === 'liveMap') {
    setTimeout(() => {
      window.sentinelMap = new window.SentinelMapEngine('full-map-container');
      window.sentinelMap.init();
    }, 50);
  }
};

/**
 * Zone Detail Slide Drawer
 */
window.openZoneDetailDrawer = function(zoneId) {
  const zone = window.SENTINEL_DATA.zones.find(z => z.id === zoneId);
  if (!zone) return;

  window.sentinelState.selectZone(zoneId);

  const drawer = document.getElementById('zone-detail-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const title = document.getElementById('zone-drawer-title');
  const body = document.getElementById('zone-drawer-body');
  const footer = document.getElementById('zone-drawer-footer');

  title.innerText = `${zone.name} — Sector Dossier`;

  body.innerHTML = `
    <!-- Key Status Cards -->
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
      <div style="background:var(--bg-surface-subtle); padding:10px; border-radius:var(--radius-sm);">
        <div style="font-size:10.5px; text-transform:uppercase; font-weight:700; color:var(--text-muted);">Risk Score</div>
        <div style="font-family:var(--font-mono); font-size:24px; font-weight:700; color:${zone.riskLevel === 'HIGH' ? 'var(--risk-red)' : 'var(--risk-yellow)'};">
          ${zone.riskScore} <span style="font-size:13px; color:var(--text-muted);">/ 100</span>
        </div>
        <div style="font-size:10.5px; color:${zone.riskLevel === 'HIGH' ? 'var(--risk-red)' : 'var(--text-muted)'}; font-weight:600;">
          ↑ Increased from ${zone.previousRiskScore}
        </div>
      </div>

      <div style="background:var(--bg-surface-subtle); padding:10px; border-radius:var(--radius-sm);">
        <div style="font-size:10.5px; text-transform:uppercase; font-weight:700; color:var(--text-muted);">Priority</div>
        <div style="margin-top:4px;">
          <span class="badge ${zone.priority === 'P1' ? 'badge-p1' : 'badge-p2'}" style="font-size:14px; padding:4px 10px;">
            ${zone.priority} PRIORITY
          </span>
        </div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">
          Evac Progress: ${zone.evacuationProgress}%
        </div>
      </div>
    </div>

    <!-- Impact Details -->
    <div style="display:flex; flex-direction:column; gap:10px;">
      <div>
        <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">People at Risk</div>
        <div style="font-size:16px; font-weight:700; color:var(--text-primary); font-family:var(--font-mono); margin-top:2px;">
          ${zone.peopleAtRisk.toLocaleString()} residents
        </div>
      </div>

      <div>
        <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Critical Facilities (${zone.facilities})</div>
        <ul style="margin:4px 0 0 16px; font-size:12px; color:var(--text-primary);">
          ${zone.facilityList.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div style="background:var(--bg-surface-subtle); padding:10px; border-radius:var(--radius-sm); border-left:3px solid var(--risk-red);">
        <div style="font-size:10.5px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Main Risk Driver</div>
        <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin-top:2px;">
          ${zone.mainDriver}
        </div>
      </div>

      <div>
        <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Recommended Actions</div>
        <div class="explainer-action-box">
          <ul style="margin:0; padding-left:16px; font-size:11.5px; display:flex; flex-direction:column; gap:4px;">
            ${zone.recommendedActions.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="window.closeZoneDetailDrawer()">Close</button>
    <button class="btn btn-secondary" onclick="window.closeZoneDetailDrawer(); window.openAssignTeamModal('${zone.id}')">
      Assign Team
    </button>
    <button class="btn btn-primary" onclick="window.closeZoneDetailDrawer(); window.sentinelState.setView('routes')">
      Plan Route
    </button>
  `;

  drawer.classList.add('open');
  backdrop.classList.add('active');
};

window.closeZoneDetailDrawer = function() {
  const drawer = document.getElementById('zone-detail-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
};

/**
 * Assign Team Modal Dialog
 */
window.openAssignTeamModal = function(zoneId) {
  const zone = window.SENTINEL_DATA.zones.find(z => z.id === zoneId) || window.SENTINEL_DATA.zones[0];
  const teams = window.SENTINEL_DATA.rescueTeams;

  const modalTitle = document.getElementById('global-modal-title');
  const modalBody = document.getElementById('global-modal-body');
  const modalFooter = document.getElementById('global-modal-footer');

  modalTitle.innerHTML = `Dispatch Tactical Rescue Unit to ${zone.name}`;

  modalBody.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div style="background:var(--bg-surface-subtle); padding:10px 12px; border-radius:var(--radius-sm); font-size:12px;">
        Deploying to <strong style="color:var(--risk-red);">${zone.id} (P1)</strong>. 
        Current residents requiring urgent boat/transport assistance: <strong>${zone.peopleAtRisk.toLocaleString()}</strong>.
      </div>

      <div>
        <label style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:4px;">
          Select Tactical Unit
        </label>
        <select id="dispatch-team-select" style="width:100%; padding:8px; border:1px solid var(--border-subtle); border-radius:var(--radius-sm); font-size:12.5px; font-weight:600;">
          ${teams.map(t => `
            <option value="${t.id}">${t.name} — ${t.vehicle} (${t.status})</option>
          `).join('')}
        </select>
      </div>

      <div>
        <label style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:4px;">
          Enforced Egress Corridor
        </label>
        <select style="width:100%; padding:8px; border:1px solid var(--border-subtle); border-radius:var(--radius-sm); font-size:12.5px;">
          <option value="R7">Route R7 — Elevated Bypass (Recommended & Safe)</option>
          <option value="R9">Route R9 — Northern Perimeter</option>
        </select>
      </div>
    </div>
  `;

  modalFooter.innerHTML = `
    <button class="btn btn-secondary" onclick="window.closeGlobalModal()">Cancel</button>
    <button class="btn btn-primary" onclick="window.confirmTeamDispatch('${zone.id}')">Authorize Dispatch</button>
  `;

  window.openGlobalModal();
};

window.confirmTeamDispatch = function(zoneId) {
  const teamId = document.getElementById('dispatch-team-select').value;
  window.sentinelState.updateRescueTeamStatus(teamId, 'En Route', `Evacuate residents in Zone ${zoneId}`);
  window.closeGlobalModal();
  window.showToast(`Unit ${teamId} dispatched to Zone ${zoneId} via Route R7.`, "success");
};

/**
 * Global Modal Dialog Handlers
 */
window.openGlobalModal = function() {
  const modal = document.getElementById('global-modal-overlay');
  if (modal) modal.classList.add('active');
};

window.closeGlobalModal = function() {
  const modal = document.getElementById('global-modal-overlay');
  if (modal) modal.classList.remove('active');
};

/**
 * Toast Notification System
 */
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div style="flex:1;">${message}</div>
    <span style="cursor:pointer; color:var(--text-muted); font-weight:700; margin-left:6px;" onclick="this.parentElement.remove()">✕</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 4500);
};

/**
 * Telemetry Heartbeat Clock & Simulation
 */
function setupTelemetryHeartbeat() {
  const clockEl = document.getElementById('clock-telemetry');
  const updateTime = () => {
    if (clockEl) {
      const now = new Date();
      clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: false });
    }
    window.sentinelState.tickTelemetry();
  };

  setInterval(updateTime, 2000);
  updateTime();
}

function renderHelpView() {
  return `
    <div style="max-width:760px; margin:0 auto; width:100%;">
      <div style="margin-bottom:var(--space-4);">
        <h1 style="font-size:18px; font-weight:700; color:var(--text-primary);">SENTINEL AI PROTOCOLS & OPERATING MANUAL</h1>
        <p style="font-size:12px; color:var(--text-muted);">Standard emergency management procedures for field leads and command operators.</p>
      </div>

      <div class="op-card">
        <div class="op-card-header"><div class="op-card-title">EMERGENCY ESCALATION MATRIX</div></div>
        <div class="op-card-body" style="font-size:12.5px; line-height:1.5;">
          <p><strong>Priority 1 (P1):</strong> Immediate threat to human life. Water influx rate exceeding +0.25m/hr with residential inundation. Evacuate within 60 minutes.</p>
          <p style="margin-top:8px;"><strong>Priority 2 (P2):</strong> Precautionary perimeter staging. Monitor sluice discharge and ready community relief shelters.</p>
          <p style="margin-top:8px;"><strong>GPS SMS Broadcast:</strong> Geo-fenced alerts are transmitted across cellular towers within designated kilometer radiuses.</p>
          <p style="margin-top:8px;"><strong>Human-in-the-Loop Rule:</strong> All AI-generated dispatches require explicit confirmation by the Incident Commander or Sector Lead.</p>
        </div>
      </div>
    </div>
  `;
}
