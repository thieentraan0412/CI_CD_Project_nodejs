const express = require('express');

const app = express();

app.use(express.json());

// GET / - Hello World endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

// GET /health - Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.get('/test', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
// GET /dashboard - Returns a beautiful HTML dashboard page
app.get('/dashboard', (req, res) => {
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Donezo – Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --green-dark:   #1a5c3a;
      --green-main:   #2d8653;
      --green-mid:    #3aab68;
      --green-light:  #5dc389;
      --green-pale:   #e8f7ef;
      --gray-100:     #f5f7fa;
      --gray-200:     #eef0f4;
      --gray-400:     #b0b8c8;
      --gray-600:     #6b7590;
      --gray-800:     #2c3248;
      --white:        #ffffff;
      --sidebar-w:    220px;
    }

    body {
      font-family: 'Inter', sans-serif;
      background: var(--gray-100);
      color: var(--gray-800);
      display: flex;
      min-height: 100vh;
    }

    /* ── SIDEBAR ── */
    .sidebar {
      width: var(--sidebar-w);
      background: var(--white);
      display: flex;
      flex-direction: column;
      padding: 28px 0;
      position: fixed;
      top: 0; left: 0; bottom: 0;
      border-right: 1px solid var(--gray-200);
      z-index: 100;
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 24px 28px;
      font-weight: 800;
      font-size: 1.2rem;
      color: var(--green-main);
    }
    .sidebar-logo .logo-icon {
      width: 36px; height: 36px;
      background: var(--green-main);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
    }
    .sidebar-logo .logo-icon span { color: white; font-size: 1.1rem; }
    .sidebar-label {
      font-size: .65rem;
      font-weight: 700;
      letter-spacing: .1em;
      color: var(--gray-400);
      padding: 0 24px 8px;
      text-transform: uppercase;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 24px;
      font-size: .875rem;
      font-weight: 500;
      color: var(--gray-600);
      cursor: pointer;
      border-radius: 0 30px 30px 0;
      margin-right: 16px;
      transition: all .2s;
      position: relative;
    }
    .nav-item:hover { background: var(--green-pale); color: var(--green-main); }
    .nav-item.active {
      background: var(--green-pale);
      color: var(--green-main);
      font-weight: 600;
    }
    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 4px;
      background: var(--green-main);
      border-radius: 0 4px 4px 0;
    }
    .nav-icon { font-size: 1.05rem; width: 20px; text-align: center; }
    .nav-badge {
      margin-left: auto;
      background: var(--green-main);
      color: white;
      font-size: .65rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 20px;
    }
    .sidebar-spacer { flex: 1; }
    .sidebar-cta {
      margin: 16px;
      background: linear-gradient(135deg, var(--green-dark), var(--green-mid));
      border-radius: 16px;
      padding: 20px;
      color: white;
    }
    .sidebar-cta p { font-size: .78rem; margin-bottom: 12px; line-height: 1.4; }
    .sidebar-cta p strong { display: block; font-size: 1rem; margin-bottom: 4px; }
    .sidebar-cta button {
      background: white;
      color: var(--green-main);
      border: none;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: .8rem;
      font-weight: 700;
      cursor: pointer;
    }

    /* ── MAIN ── */
    .main {
      margin-left: var(--sidebar-w);
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* ── TOP BAR ── */
    .topbar {
      background: var(--white);
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 32px;
      border-bottom: 1px solid var(--gray-200);
      position: sticky;
      top: 0;
      z-index: 99;
    }
    .search-box {
      flex: 1;
      max-width: 360px;
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--gray-100);
      border-radius: 12px;
      padding: 9px 16px;
      font-size: .875rem;
      color: var(--gray-400);
    }
    .topbar-icons { margin-left: auto; display: flex; align-items: center; gap: 16px; }
    .topbar-icon {
      width: 38px; height: 38px;
      border-radius: 12px;
      background: var(--gray-100);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background .2s;
    }
    .topbar-icon:hover { background: var(--green-pale); }
    .user-info { display: flex; align-items: center; gap: 10px; }
    .avatar {
      width: 40px; height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f99, #f66);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
    }
    .user-name { font-weight: 600; font-size: .875rem; }
    .user-email { font-size: .72rem; color: var(--gray-400); }

    /* ── CONTENT ── */
    .content { padding: 32px; }
    .page-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 28px;
    }
    .page-title { font-size: 2rem; font-weight: 800; }
    .page-sub { color: var(--gray-400); font-size: .875rem; margin-top: 4px; }
    .header-actions { margin-left: auto; display: flex; gap: 12px; }
    .btn-primary {
      background: var(--green-main);
      color: white;
      border: none;
      padding: 11px 22px;
      border-radius: 30px;
      font-weight: 600;
      font-size: .875rem;
      cursor: pointer;
      display: flex; align-items: center; gap: 8px;
      transition: background .2s;
    }
    .btn-primary:hover { background: var(--green-dark); }
    .btn-outline {
      background: transparent;
      color: var(--gray-800);
      border: 1.5px solid var(--gray-200);
      padding: 11px 22px;
      border-radius: 30px;
      font-weight: 600;
      font-size: .875rem;
      cursor: pointer;
      transition: all .2s;
    }
    .btn-outline:hover { border-color: var(--green-main); color: var(--green-main); }

    /* ── STATS ROW ── */
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px; }
    .stat-card {
      background: var(--white);
      border-radius: 20px;
      padding: 22px 24px;
      position: relative;
      overflow: hidden;
      animation: fadeUp .4s ease both;
    }
    .stat-card.highlight {
      background: linear-gradient(135deg, var(--green-main), var(--green-dark));
      color: white;
    }
    .stat-label { font-size: .8rem; font-weight: 600; color: var(--gray-600); margin-bottom: 12px; }
    .stat-card.highlight .stat-label { color: rgba(255,255,255,0.75); }
    .stat-value { font-size: 2.5rem; font-weight: 800; line-height: 1; margin-bottom: 10px; }
    .stat-trend {
      display: flex; align-items: center; gap: 6px;
      font-size: .75rem; color: var(--green-mid);
    }
    .stat-card.highlight .stat-trend { color: rgba(255,255,255,0.8); }
    .stat-arrow {
      position: absolute;
      top: 18px; right: 18px;
      width: 32px; height: 32px;
      border-radius: 50%;
      border: 1.5px solid currentColor;
      display: flex; align-items: center; justify-content: center;
      font-size: .9rem;
      opacity: .5;
    }
    .stat-card.highlight .stat-arrow { color: white; }

    /* ── MIDDLE ROW ── */
    .middle-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 20px; margin-bottom: 24px; }

    /* Analytics Card */
    .analytics-card {
      background: var(--white);
      border-radius: 20px;
      padding: 24px;
    }
    .card-title { font-size: .95rem; font-weight: 700; margin-bottom: 20px; }
    .bars { display: flex; align-items: flex-end; gap: 10px; height: 130px; }
    .bar-col { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
    .bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; }
    .bar {
      width: 100%;
      border-radius: 8px 8px 0 0;
      position: relative;
      transition: opacity .2s;
    }
    .bar:hover { opacity: .85; }
    .bar.solid-dark { background: var(--green-dark); }
    .bar.solid-mid  { background: var(--green-mid); }
    .bar.hatched {
      background: repeating-linear-gradient(
        45deg,
        var(--green-main) 0px, var(--green-main) 3px,
        transparent 3px, transparent 8px
      );
      border: 2px solid var(--green-main);
    }
    .bar-label { font-size: .7rem; color: var(--gray-400); font-weight: 500; }
    .bar-peak {
      position: absolute;
      top: -22px; left: 50%; transform: translateX(-50%);
      background: var(--green-dark);
      color: white;
      font-size: .65rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 6px;
    }

    /* Reminder Card */
    .reminder-card {
      background: var(--white);
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
    }
    .reminder-title { font-size: 1.05rem; font-weight: 800; margin-bottom: 6px; color: var(--green-dark); }
    .reminder-time { font-size: .8rem; color: var(--gray-400); margin-bottom: auto; }
    .btn-meet {
      margin-top: 20px;
      background: var(--green-dark);
      color: white;
      border: none;
      padding: 12px;
      border-radius: 14px;
      font-weight: 600;
      font-size: .875rem;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }

    /* Project list card */
    .project-list-card {
      background: var(--white);
      border-radius: 20px;
      padding: 24px;
    }
    .card-header { display: flex; align-items: center; margin-bottom: 16px; }
    .btn-new {
      margin-left: auto;
      background: transparent;
      border: 1.5px solid var(--gray-200);
      color: var(--gray-600);
      padding: 5px 14px;
      border-radius: 20px;
      font-size: .75rem;
      font-weight: 600;
      cursor: pointer;
    }
    .project-item { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .project-dot {
      width: 32px; height: 32px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .project-info { flex: 1; min-width: 0; }
    .project-name { font-size: .82rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .project-due { font-size: .7rem; color: var(--gray-400); }

    /* ── BOTTOM ROW ── */
    .bottom-row { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 20px; }

    /* Team card */
    .team-card {
      background: var(--white);
      border-radius: 20px;
      padding: 24px;
    }
    .member-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .member-avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .member-info { flex: 1; min-width: 0; }
    .member-name { font-size: .82rem; font-weight: 600; }
    .member-task { font-size: .72rem; color: var(--gray-400); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .status-badge {
      font-size: .68rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
      flex-shrink: 0;
    }
    .badge-done    { background: #e8f7ef; color: var(--green-main); }
    .badge-prog    { background: #fff4e0; color: #e8960c; }
    .badge-pending { background: #fde8e8; color: #d94040; }

    /* Progress card */
    .progress-card {
      background: var(--white);
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .donut-wrap {
      position: relative;
      width: 150px; height: 150px;
      margin: 16px 0;
    }
    .donut-wrap svg { transform: rotate(-90deg); }
    .donut-label {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    .donut-pct { font-size: 1.8rem; font-weight: 800; }
    .donut-sub { font-size: .7rem; color: var(--gray-400); }
    .legend { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
    .legend-item { display: flex; align-items: center; gap: 5px; font-size: .72rem; color: var(--gray-600); }
    .legend-dot { width: 10px; height: 10px; border-radius: 3px; }

    /* Time Tracker */
    .timer-card {
      background: linear-gradient(135deg, #0f3d24, #1a5c3a);
      border-radius: 20px;
      padding: 24px;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .timer-title { font-size: .85rem; font-weight: 600; opacity: .7; margin-bottom: 16px; }
    .timer-display { font-size: 2.5rem; font-weight: 800; letter-spacing: .05em; margin-bottom: 20px; }
    .timer-controls { display: flex; gap: 12px; }
    .timer-btn {
      width: 44px; height: 44px;
      border-radius: 50%;
      border: none;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      cursor: pointer;
    }
    .timer-btn.pause { background: white; }
    .timer-btn.stop  { background: #e53e3e; color: white; }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .middle-row > *, .bottom-row > *, .stats-row > * {
      animation: fadeUp .45s ease both;
    }
    .stats-row > *:nth-child(1) { animation-delay: .05s; }
    .stats-row > *:nth-child(2) { animation-delay: .10s; }
    .stats-row > *:nth-child(3) { animation-delay: .15s; }
    .stats-row > *:nth-child(4) { animation-delay: .20s; }
    .middle-row > *:nth-child(1) { animation-delay: .25s; }
    .middle-row > *:nth-child(2) { animation-delay: .30s; }
    .middle-row > *:nth-child(3) { animation-delay: .35s; }
    .bottom-row > *:nth-child(1) { animation-delay: .40s; }
    .bottom-row > *:nth-child(2) { animation-delay: .45s; }
    .bottom-row > *:nth-child(3) { animation-delay: .50s; }
  </style>
</head>
<body>

<!-- ── SIDEBAR ── -->
<aside class="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon"><span>◎</span></div>
    Donezo
  </div>

  <div class="sidebar-label">Menu</div>
  <div class="nav-item active"><span class="nav-icon">⊞</span> Dashboard</div>
  <div class="nav-item"><span class="nav-icon">✓</span> Tasks <span class="nav-badge">12+</span></div>
  <div class="nav-item"><span class="nav-icon">📅</span> Calendar</div>
  <div class="nav-item"><span class="nav-icon">📊</span> Analytics</div>
  <div class="nav-item"><span class="nav-icon">👥</span> Team</div>

  <div class="sidebar-label" style="margin-top:20px">General</div>
  <div class="nav-item"><span class="nav-icon">⚙️</span> Settings</div>
  <div class="nav-item"><span class="nav-icon">❓</span> Help</div>
  <div class="nav-item"><span class="nav-icon">🚪</span> Logout</div>

  <div class="sidebar-spacer"></div>
  <div class="sidebar-cta">
    <p><strong>Download our<br>Mobile App</strong> Get easy in another way.</p>
    <button>Download</button>
  </div>
</aside>

<!-- ── MAIN ── -->
<div class="main">

  <!-- TOP BAR -->
  <header class="topbar">
    <div class="search-box">🔍 &nbsp; Search task <span style="margin-left:auto;font-size:.75rem;background:var(--gray-200);padding:2px 8px;border-radius:6px">⌘ F</span></div>
    <div class="topbar-icons">
      <div class="topbar-icon">✉️</div>
      <div class="topbar-icon">🔔</div>
      <div class="user-info">
        <div class="avatar">👤</div>
        <div>
          <div class="user-name">Totok Michael</div>
          <div class="user-email">tmichael20@mail.com</div>
        </div>
      </div>
    </div>
  </header>

  <!-- CONTENT -->
  <div class="content">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-sub">Plan, prioritize, and accomplish your tasks with ease.</p>
      </div>
      <div class="header-actions">
        <button class="btn-primary">＋ Add Project</button>
        <button class="btn-outline">⬆ Import Data</button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-row">
      <div class="stat-card highlight">
        <div class="stat-label">Total Projects</div>
        <div class="stat-value">24</div>
        <div class="stat-trend">↑ Increased from last month</div>
        <div class="stat-arrow">↗</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Ended Projects</div>
        <div class="stat-value">10</div>
        <div class="stat-trend" style="color:var(--green-mid)">↑ Increased from last month</div>
        <div class="stat-arrow">↗</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Running Projects</div>
        <div class="stat-value">12</div>
        <div class="stat-trend" style="color:var(--green-mid)">↑ Increased from last month</div>
        <div class="stat-arrow">↗</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending Project</div>
        <div class="stat-value">2</div>
        <div class="stat-trend" style="color:var(--gray-400)">On Discuss</div>
        <div class="stat-arrow">↗</div>
      </div>
    </div>

    <!-- Middle Row -->
    <div class="middle-row">

      <!-- Analytics -->
      <div class="analytics-card">
        <div class="card-title">Project Analytics</div>
        <div class="bars">
          <div class="bar-col"><div class="bar-wrap"><div class="bar hatched" style="height:55%"></div></div><div class="bar-label">S</div></div>
          <div class="bar-col"><div class="bar-wrap"><div class="bar solid-mid" style="height:75%"></div></div><div class="bar-label">M</div></div>
          <div class="bar-col"><div class="bar-wrap"><div class="bar hatched" style="height:45%"></div></div><div class="bar-label">T</div></div>
          <div class="bar-col">
            <div class="bar-wrap">
              <div class="bar solid-dark" style="height:100%;position:relative;">
                <div class="bar-peak">78%</div>
              </div>
            </div>
            <div class="bar-label">W</div>
          </div>
          <div class="bar-col"><div class="bar-wrap"><div class="bar hatched" style="height:62%"></div></div><div class="bar-label">T</div></div>
          <div class="bar-col"><div class="bar-wrap"><div class="bar solid-mid" style="height:40%"></div></div><div class="bar-label">F</div></div>
          <div class="bar-col"><div class="bar-wrap"><div class="bar hatched" style="height:30%"></div></div><div class="bar-label">S</div></div>
        </div>
      </div>

      <!-- Reminders -->
      <div class="reminder-card">
        <div class="card-title">Reminders</div>
        <div class="reminder-title">Meeting with Arc Company</div>
        <div class="reminder-time">Time: 02:00 pm – 04:00 pm</div>
        <button class="btn-meet">▶ Start Meeting</button>
      </div>

      <!-- Project List -->
      <div class="project-list-card">
        <div class="card-header">
          <div class="card-title" style="margin:0">Project</div>
          <button class="btn-new">+ New</button>
        </div>
        <div class="project-item">
          <div class="project-dot" style="background:#e8f0ff">🔷</div>
          <div class="project-info"><div class="project-name">Develop API Endpoints</div><div class="project-due">Due date: Nov 26, 2024</div></div>
        </div>
        <div class="project-item">
          <div class="project-dot" style="background:#e8f7ef">🌊</div>
          <div class="project-info"><div class="project-name">Onboarding Flow</div><div class="project-due">Due date: Nov 28, 2024</div></div>
        </div>
        <div class="project-item">
          <div class="project-dot" style="background:#fff4e0">⚡</div>
          <div class="project-info"><div class="project-name">Build Dashboard</div><div class="project-due">Due date: Nov 30, 2024</div></div>
        </div>
        <div class="project-item">
          <div class="project-dot" style="background:#fde8e8">🔥</div>
          <div class="project-info"><div class="project-name">Optimize Page Load</div><div class="project-due">Due date: Dec 5, 2024</div></div>
        </div>
        <div class="project-item">
          <div class="project-dot" style="background:#f3e8ff">🟣</div>
          <div class="project-info"><div class="project-name">Cross-Browser Testing</div><div class="project-due">Due date: Dec 6, 2024</div></div>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="bottom-row">

      <!-- Team -->
      <div class="team-card">
        <div class="card-header">
          <div class="card-title" style="margin:0">Team Collaboration</div>
          <button class="btn-new">+ Add Member</button>
        </div>
        <div class="member-row">
          <div class="member-avatar" style="background:#fde8e8">👩</div>
          <div class="member-info"><div class="member-name">Alexandra Deff</div><div class="member-task">Working on Github Project Repository</div></div>
          <span class="status-badge badge-done">Completed</span>
        </div>
        <div class="member-row">
          <div class="member-avatar" style="background:#e8f7ef">👨</div>
          <div class="member-info"><div class="member-name">Edwin Adenike</div><div class="member-task">Working on Integrate User Auth System</div></div>
          <span class="status-badge badge-prog">In Progress</span>
        </div>
        <div class="member-row">
          <div class="member-avatar" style="background:#e8f0ff">🧑</div>
          <div class="member-info"><div class="member-name">Isaac Oluwatemi</div><div class="member-task">Working on Search & Filter Feature</div></div>
          <span class="status-badge badge-pending">Pending</span>
        </div>
        <div class="member-row">
          <div class="member-avatar" style="background:#fff4e0">👦</div>
          <div class="member-info"><div class="member-name">David Oshodi</div><div class="member-task">Working on Responsive Layout</div></div>
          <span class="status-badge badge-prog">In Progress</span>
        </div>
      </div>

      <!-- Project Progress (Donut) -->
      <div class="progress-card">
        <div class="card-title">Project Progress</div>
        <div class="donut-wrap">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <circle cx="75" cy="75" r="60" fill="none" stroke="#eef0f4" stroke-width="18"/>
            <!-- Completed 41% -->
            <circle cx="75" cy="75" r="60" fill="none" stroke="#2d8653" stroke-width="18"
              stroke-dasharray="154 377" stroke-linecap="round"/>
            <!-- In Progress 38% -->
            <circle cx="75" cy="75" r="60" fill="none" stroke="#5dc389" stroke-width="18"
              stroke-dasharray="143 377" stroke-dashoffset="-160" stroke-linecap="round"/>
            <!-- Pending hatched simulation -->
            <circle cx="75" cy="75" r="60" fill="none"
              stroke="url(#hatch)" stroke-width="18"
              stroke-dasharray="80 377" stroke-dashoffset="-310" stroke-linecap="round"/>
            <defs>
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#3aab68" stroke-width="2"/>
              </pattern>
            </defs>
          </svg>
          <div class="donut-label">
            <div class="donut-pct">41%</div>
            <div class="donut-sub">Project Ended</div>
          </div>
        </div>
        <div class="legend">
          <div class="legend-item"><div class="legend-dot" style="background:var(--green-main)"></div> Completed</div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--green-light)"></div> In Progress</div>
          <div class="legend-item">
            <div class="legend-dot" style="background:repeating-linear-gradient(45deg,#3aab68 0,#3aab68 2px,transparent 2px,transparent 5px)"></div> Pending
          </div>
        </div>
      </div>

      <!-- Time Tracker -->
      <div class="timer-card">
        <div class="timer-title">⏱ Time Tracker</div>
        <div class="timer-display" id="timer">01:24:08</div>
        <div class="timer-controls">
          <button class="timer-btn pause" id="pauseBtn" onclick="toggleTimer()">⏸</button>
          <button class="timer-btn stop" onclick="stopTimer()">⏹</button>
        </div>
      </div>

    </div>
  </div><!-- /content -->
</div><!-- /main -->

<script>
  let seconds = 5048;
  let running = true;
  let interval = setInterval(tick, 1000);

  function tick() {
    if (!running) return;
    seconds++;
    document.getElementById('timer').textContent = fmt(seconds);
  }

  function fmt(s) {
    const h = String(Math.floor(s / 3600)).padStart(2,'0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2,'0');
    const ss = String(s % 60).padStart(2,'0');
    return h + ':' + m + ':' + ss;
  }

  function toggleTimer() {
    running = !running;
    document.getElementById('pauseBtn').textContent = running ? '⏸' : '▶';
  }

  function stopTimer() {
    running = false;
    clearInterval(interval);
    seconds = 0;
    document.getElementById('timer').textContent = '00:00:00';
    document.getElementById('pauseBtn').textContent = '▶';
  }
</script>

</body>
</html>`);
});

module.exports = app;
