import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  ReferenceLine,
  Legend,
  Area,
  AreaChart,
} from "recharts";

// ── DATA ────────────────────────────────────────────────────
const EMPLOYEES = [
  {
    id: "EMP_1172",
    wellness: 34.3,
    churn: 98.9,
    burnout: 70.7,
    tier: "HIGH",
    dept: "Research & Development",
    role: "Research Scientist",
    tenure: 1.2,
    pillars: {
      Mental: 29,
      WorkLife: 47,
      Physical: 47,
      Emotional: 23,
      Professional: 16,
      Social: 49,
      Autonomy: 20,
    },
    weeks: [72, 68, 63, 58, 54, 49, 45, 41, 38, 35, 34, 34],
    ptoSpike: false,
    dangerWeek: 1,
    trend: -3.2,
  },
  {
    id: "EMP_0600",
    wellness: 41.0,
    churn: 98.8,
    burnout: 64.9,
    tier: "HIGH",
    dept: "Sales",
    role: "Sales Executive",
    tenure: 0.8,
    pillars: {
      Mental: 63,
      WorkLife: 47,
      Physical: 51,
      Emotional: 18,
      Professional: 12,
      Social: 33,
      Autonomy: 40,
    },
    weeks: [68, 65, 61, 57, 54, 50, 47, 44, 42, 41, 41, 41],
    ptoSpike: true,
    dangerWeek: 2,
    trend: -2.8,
  },
  {
    id: "EMP_0593",
    wellness: 48.9,
    churn: 98.8,
    burnout: 58.2,
    tier: "HIGH",
    dept: "Research & Development",
    role: "Research Scientist",
    tenure: 2.1,
    pillars: {
      Mental: 40,
      WorkLife: 85,
      Physical: 61,
      Emotional: 12,
      Professional: 37,
      Social: 38,
      Autonomy: 54,
    },
    weeks: [74, 71, 67, 63, 60, 57, 54, 52, 50, 49, 49, 49],
    ptoSpike: false,
    dangerWeek: 3,
    trend: -2.5,
  },
  {
    id: "EMP_0787",
    wellness: 36.0,
    churn: 97.2,
    burnout: 72.1,
    tier: "HIGH",
    dept: "HR",
    role: "HR Manager",
    tenure: 1.1,
    pillars: {
      Mental: 25,
      WorkLife: 40,
      Physical: 38,
      Emotional: 20,
      Professional: 22,
      Social: 35,
      Autonomy: 18,
    },
    weeks: [55, 51, 47, 43, 39, 35, 32, 29, 27, 26, 36, 36],
    ptoSpike: true,
    dangerWeek: 1,
    trend: -1.11,
  },
  {
    id: "EMP_1226",
    wellness: 39.0,
    churn: 96.5,
    burnout: 68.4,
    tier: "HIGH",
    dept: "Sales",
    role: "Sales Rep",
    tenure: 2.3,
    pillars: {
      Mental: 32,
      WorkLife: 45,
      Physical: 41,
      Emotional: 22,
      Professional: 25,
      Social: 38,
      Autonomy: 28,
    },
    weeks: [54, 51, 48, 45, 42, 39, 37, 35, 34, 39, 39, 39],
    ptoSpike: true,
    dangerWeek: 1,
    trend: -0.99,
  },
  {
    id: "EMP_1447",
    wellness: 45.8,
    churn: 98.7,
    burnout: 60.9,
    tier: "HIGH",
    dept: "Research & Development",
    role: "Lab Technician",
    tenure: 1.5,
    pillars: {
      Mental: 35,
      WorkLife: 52,
      Physical: 44,
      Emotional: 21,
      Professional: 28,
      Social: 41,
      Autonomy: 31,
    },
    weeks: [70, 67, 64, 61, 58, 55, 52, 50, 48, 46, 46, 46],
    ptoSpike: false,
    dangerWeek: 2,
    trend: -2.2,
  },
  {
    id: "EMP_0712",
    wellness: 51.2,
    churn: 72.4,
    burnout: 48.1,
    tier: "MEDIUM",
    dept: "Sales",
    role: "Sales Executive",
    tenure: 3.5,
    pillars: {
      Mental: 55,
      WorkLife: 62,
      Physical: 58,
      Emotional: 38,
      Professional: 44,
      Social: 52,
      Autonomy: 47,
    },
    weeks: [62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51],
    ptoSpike: false,
    dangerWeek: null,
    trend: -0.92,
  },
  {
    id: "EMP_0834",
    wellness: 53.6,
    churn: 68.9,
    burnout: 45.2,
    tier: "MEDIUM",
    dept: "HR",
    role: "HR Manager",
    tenure: 4.2,
    pillars: {
      Mental: 58,
      WorkLife: 65,
      Physical: 60,
      Emotional: 42,
      Professional: 48,
      Social: 55,
      Autonomy: 50,
    },
    weeks: [63, 62, 61, 61, 60, 59, 58, 57, 57, 56, 55, 54],
    ptoSpike: false,
    dangerWeek: null,
    trend: -0.78,
  },
  {
    id: "EMP_1156",
    wellness: 56.1,
    churn: 64.2,
    burnout: 41.8,
    tier: "MEDIUM",
    dept: "Research & Development",
    role: "Lab Technician",
    tenure: 2.8,
    pillars: {
      Mental: 62,
      WorkLife: 68,
      Physical: 63,
      Emotional: 46,
      Professional: 52,
      Social: 58,
      Autonomy: 54,
    },
    weeks: [64, 63, 63, 62, 61, 61, 60, 59, 58, 57, 57, 56],
    ptoSpike: true,
    dangerWeek: null,
    trend: -0.65,
  },
  {
    id: "EMP_0346",
    wellness: 81.5,
    churn: 0.2,
    burnout: 15.8,
    tier: "LOW",
    dept: "Research & Development",
    role: "Research Director",
    tenure: 8.4,
    pillars: {
      Mental: 81,
      WorkLife: 86,
      Physical: 81,
      Emotional: 73,
      Professional: 77,
      Social: 73,
      Autonomy: 100,
    },
    weeks: [78, 79, 80, 80, 81, 81, 82, 82, 82, 81, 81, 82],
    ptoSpike: false,
    dangerWeek: null,
    trend: 0.38,
  },
  {
    id: "EMP_0892",
    wellness: 74.2,
    churn: 3.1,
    burnout: 21.3,
    tier: "LOW",
    dept: "Sales",
    role: "Sales Executive",
    tenure: 6.2,
    pillars: {
      Mental: 75,
      WorkLife: 79,
      Physical: 74,
      Emotional: 68,
      Professional: 71,
      Social: 69,
      Autonomy: 82,
    },
    weeks: [71, 72, 72, 73, 73, 74, 74, 74, 75, 74, 74, 74],
    ptoSpike: false,
    dangerWeek: null,
    trend: 0.29,
  },
  {
    id: "EMP_0451",
    wellness: 78.9,
    churn: 1.4,
    burnout: 17.6,
    tier: "LOW",
    dept: "Research & Development",
    role: "Research Scientist",
    tenure: 7.1,
    pillars: {
      Mental: 79,
      WorkLife: 83,
      Physical: 78,
      Emotional: 71,
      Professional: 74,
      Social: 71,
      Autonomy: 91,
    },
    weeks: [76, 77, 77, 78, 78, 79, 79, 80, 79, 79, 79, 79],
    ptoSpike: false,
    dangerWeek: null,
    trend: 0.24,
  },
];

// Trend data — weekly wellness for overview
const TREND_OVERVIEW = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  HIGH: Math.round(
    EMPLOYEES.filter((e) => e.tier === "HIGH").reduce(
      (s, e) => s + e.weeks[i],
      0
    ) / EMPLOYEES.filter((e) => e.tier === "HIGH").length
  ),
  MEDIUM: Math.round(
    EMPLOYEES.filter((e) => e.tier === "MEDIUM").reduce(
      (s, e) => s + e.weeks[i],
      0
    ) / EMPLOYEES.filter((e) => e.tier === "MEDIUM").length
  ),
  LOW: Math.round(
    EMPLOYEES.filter((e) => e.tier === "LOW").reduce(
      (s, e) => s + e.weeks[i],
      0
    ) / EMPLOYEES.filter((e) => e.tier === "LOW").length
  ),
}));

// ── CONSTANTS ────────────────────────────────────────────────
const TIER_COLORS = { HIGH: "#ff4b4b", MEDIUM: "#ffa500", LOW: "#00c853" };
const TIER_BG = {
  HIGH: "rgba(255,75,75,0.12)",
  MEDIUM: "rgba(255,165,0,0.12)",
  LOW: "rgba(0,200,83,0.12)",
};
function getSmartActions(emp) {
  const scenarios = {
    EMP_1172: [
      {
        signal: "Career growth stagnation — primary driver",
        action:
          "Professional fulfillment is the critical risk factor. Initiate a structured career conversation this week — discuss promotion timeline, assign a high-visibility project, and set 90-day development milestones.",
      },
      {
        signal: "Autonomy deficit — secondary signal",
        action:
          "Decision-making patterns suggest micromanagement. Delegate ownership of one key initiative and reduce approval bottlenecks to restore sense of control.",
      },
    ],
    EMP_0600: [
      {
        signal: "Professional fulfillment critically low + PTO spike",
        action:
          "Career trajectory concern is driving disengagement. PTO spike suggests active stress response. Prioritize a compensation and role-scope review before the next performance cycle.",
      },
      {
        signal: "Recognition drought",
        action:
          "No peer or manager recognition detected in 60+ days. Send a specific, personal acknowledgment of recent contributions — avoid generic praise.",
      },
    ],
    EMP_0593: [
      {
        signal: "Emotional engagement collapse — primary driver",
        action:
          "Engagement score is critically low despite healthy work-life balance. Employee may feel disconnected from team mission. Schedule a values-alignment conversation and involve them in a meaningful team decision.",
      },
      {
        signal: "Social withdrawal emerging",
        action:
          "Collaboration frequency declining. Assign a cross-functional project to rebuild peer connections before isolation worsens.",
      },
    ],
    EMP_0787: [
      {
        signal: "Autonomy severely compromised + PTO spike",
        action:
          "Autonomy is the primary burnout driver. Employee is showing active stress response via leave behavior. Immediately review management style — reduce micromanagement and restore decision ownership on at least 2 current tasks.",
      },
      {
        signal: "Mental health signals declining",
        action:
          "Wellness trajectory declining at 1.11pts/week. Escalate to HR business partner for a confidential support conversation within 5 business days.",
      },
    ],
    EMP_1226: [
      {
        signal: "Recognition gap + PTO anomaly — urgent combination",
        action:
          "Recognition drought combined with sudden PTO behavior is a high-confidence churn signal. Send personal recognition this week AND schedule a 1:1 focused on career satisfaction — not performance.",
      },
      {
        signal: "Professional growth stagnating",
        action:
          "Career milestone velocity has slowed. Discuss upcoming opportunities, skill development plan, and whether current role still aligns with long-term goals.",
      },
    ],
    EMP_1447: [
      {
        signal: "Emotional engagement — primary risk driver",
        action:
          "Engagement is the weakest signal. Check when this employee last received meaningful feedback. Schedule a recognition-focused conversation and nominate for a peer spotlight or team award.",
      },
      {
        signal: "Sustained 12-week decline",
        action:
          "Wellness declining at 2.2pts/week for 3 months. This is beyond normal fluctuation — escalate to HR business partner and review total compensation package vs market.",
      },
    ],
    EMP_1872: [
      {
        signal: "Emotional engagement critically low",
        action:
          "Engagement score of 19 indicates severe disconnection. Investigate whether workload changes or team dynamics shifted 8-10 weeks ago. Direct manager conversation focused on what support looks like to this employee.",
      },
      {
        signal: "Professional fulfillment declining",
        action:
          "Career growth signals weakening. Discuss whether role responsibilities have expanded without corresponding title or compensation adjustment.",
      },
    ],
    EMP_1281: [
      {
        signal: "Emotional engagement — lowest pillar",
        action:
          "Recognition and engagement signals weak. This employee has not received meaningful acknowledgment recently. Proactively highlight their specific contributions in the next team meeting.",
      },
      {
        signal: "Declining trajectory over 12 weeks",
        action:
          "Steady decline of 1.9pts/week suggests a structural issue, not a temporary dip. Review workload distribution and check for any recent team or reporting changes.",
      },
    ],
    EMP_0039: [
      {
        signal: "Emotional engagement + PTO spike — critical combination",
        action:
          "Lowest emotional engagement on the team combined with sudden leave behavior. This employee is actively disengaging. Immediate 1:1 focused on listening only — not performance. Ask what would make work better.",
      },
      {
        signal: "Professional growth stalled",
        action:
          "Learning and development activity near zero. Offer a concrete growth opportunity — conference attendance, certification sponsorship, or lead role on an upcoming project.",
      },
    ],
    EMP_1321: [
      {
        signal: "Emotional engagement critically low",
        action:
          "Engagement at 20/100 with consistent weekly decline. Check for any unresolved team conflicts or management friction that may be driving disengagement. Conduct a stay interview.",
      },
      {
        signal: "Autonomy signals weak",
        action:
          "Patterns suggest limited input into decisions. Invite this employee to co-lead a team initiative or contribute to a department planning session to rebuild sense of ownership.",
      },
    ],
    EMP_0712: [
      {
        signal: "Emotional engagement — early warning signal",
        action:
          "Engagement declining steadily at 0.92pts/week. Not critical yet but trajectory is concerning. Schedule an informal check-in focused on career satisfaction and team dynamics within 2 weeks.",
      },
    ],
    EMP_0834: [
      {
        signal: "Emotional engagement — monitor closely",
        action:
          "Engagement is the weakest dimension. Ensure this employee is receiving regular recognition. Check if workload has increased without acknowledgment over the past month.",
      },
    ],
    EMP_1156: [
      {
        signal: "Emotional engagement + PTO anomaly",
        action:
          "Engagement declining with PTO behavior change. Leave patterns suggest emerging stress. Encourage planned vacation use and check in informally on workload and team satisfaction.",
      },
    ],
    EMP_0291: [
      {
        signal: "Emotional engagement — watch trend",
        action:
          "Engagement is the only dimension showing consistent decline. Investigate whether any recent org changes affected this employee's team or reporting structure.",
      },
    ],
    EMP_1643: [
      {
        signal: "Emotional engagement — early flag",
        action:
          "All pillars healthy except engagement which is slightly below threshold. A simple recognition conversation this week could prevent further decline. No escalation needed yet.",
      },
    ],
    EMP_0346: [
      {
        signal: "All systems healthy — maintain momentum",
        action:
          "No intervention required. Wellness trajectory positive at +0.38pts/week. Schedule quarterly check-in to maintain engagement. Consider this employee for mentorship or leadership opportunities.",
      },
    ],
    EMP_0892: [
      {
        signal: "Stable and healthy",
        action:
          "Wellness improving steadily. Social and emotional scores slightly lower than other dimensions — ensure this employee stays connected to team activities and receives regular recognition to maintain trajectory.",
      },
    ],
    EMP_0451: [
      {
        signal: "Healthy — no action needed",
        action:
          "All pillars well above threshold with positive trend. Continue current management approach. This employee may be a good candidate for peer mentoring or team leadership roles.",
      },
    ],
    EMP_1203: [
      {
        signal: "Stable — minor social signal to watch",
        action:
          "Social connection slightly lower than other dimensions. Not concerning yet — ensure inclusion in team activities and cross-functional projects to maintain strong engagement.",
      },
    ],
    EMP_0567: [
      {
        signal: "Stable with minor declining trend",
        action:
          "Wellness slightly declining at 0.12pts/week. Not urgent but worth monitoring. Schedule a routine check-in next month. Ensure workload hasn't quietly increased without recognition.",
      },
    ],
  };

  if (scenarios[emp.id]) return scenarios[emp.id];

  // Fallback for employees not hardcoded — find lowest pillar
  const p = emp.pillars;
  const sorted = Object.entries(p).sort((a, b) => a[1] - b[1]);
  const [lowestPillar, lowestVal] = sorted[0];
  const [secondPillar, secondVal] = sorted[1];

  const pillarMessages = {
    Professional: {
      signal: "Career growth stagnation",
      action: `Professional fulfillment at ${lowestVal}/100. Initiate career development conversation — discuss promotion timeline and assign a high-visibility project.`,
    },
    Emotional: {
      signal: "Engagement declining",
      action: `Emotional engagement at ${lowestVal}/100. Recognition drought likely. Send specific personal acknowledgment and schedule a values-alignment conversation.`,
    },
    Autonomy: {
      signal: "Autonomy deficit detected",
      action: `Autonomy score at ${lowestVal}/100. Review management approach — delegate ownership of at least one current initiative to restore sense of control.`,
    },
    WorkLife: {
      signal: "Work-life imbalance",
      action: `Work-life balance at ${lowestVal}/100. Overtime or meeting overload detected. Audit calendar and redistribute tasks to reduce sustained after-hours activity.`,
    },
    Physical: {
      signal: "Physical wellbeing signals",
      action: `Physical wellbeing at ${lowestVal}/100. ${
        emp.ptoSpike
          ? "PTO spike detected — active stress response. Encourage planned time off immediately."
          : "PTO underutilized — proactively encourage vacation before burnout escalates."
      }`,
    },
    Social: {
      signal: "Social withdrawal",
      action: `Social connection at ${lowestVal}/100. Collaboration activity declining. Assign cross-functional project to rebuild peer connections.`,
    },
    Mental: {
      signal: "Mental health trend declining",
      action: `Mental wellness at ${lowestVal}/100 with ${emp.trend?.toFixed(
        1
      )}pt/week decline. Escalate to HR business partner for confidential support conversation.`,
    },
  };

  return [
    pillarMessages[lowestPillar] || {
      signal: "Wellness declining",
      action:
        "Schedule immediate HR business partner conversation to assess support needs.",
    },
    secondVal < 40 ? pillarMessages[secondPillar] || null : null,
  ].filter(Boolean);
}

function getPillarColor(v) {
  return v < 40 ? "#ff4b4b" : v < 65 ? "#ffa500" : "#00c853";
}

// ── COMPONENTS ───────────────────────────────────────────────
function TierBadge({ tier, large }) {
  return (
    <span
      style={{
        background: TIER_BG[tier],
        color: TIER_COLORS[tier],
        border: `1px solid ${TIER_COLORS[tier]}33`,
        padding: large ? "6px 16px" : "3px 10px",
        borderRadius: 20,
        fontSize: large ? 13 : 11,
        fontWeight: 600,
        letterSpacing: "0.05em",
      }}
    >
      {tier}
    </span>
  );
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div
      style={{
        background: "#111627",
        border: "1px solid #1e2540",
        borderRadius: 14,
        padding: "20px 22px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#6b7a99",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || "#fff" }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: "#6b7a99", marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function PillarBars({ pillars }) {
  return (
    <div>
      {Object.entries(pillars).map(([name, val]) => (
        <div
          key={name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 110,
              fontSize: 12,
              color: "#8892b0",
              flexShrink: 0,
            }}
          >
            {name}
          </div>
          <div
            style={{
              flex: 1,
              height: 8,
              background: "#1e2540",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${val}%`,
                height: "100%",
                background: getPillarColor(val),
                borderRadius: 4,
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: getPillarColor(val),
              width: 36,
              textAlign: "right",
            }}
          >
            {val}
          </div>
        </div>
      ))}
    </div>
  );
}

function WellnessTrendChart({ emp, showIntervention }) {
  const data = emp.weeks.map((w, i) => ({
    week: `W${i + 1}`,
    wellness: w,
    danger: 50,
    intervention: showIntervention && i === 7 ? w : null,
  }));

  const CustomDot = (props) => {
    const { cx, cy, index } = props;
    if (showIntervention && index === 7) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={8} fill="#4c9be8" fillOpacity={0.3} />
          <circle cx={cx} cy={cy} r={4} fill="#4c9be8" />
          <text
            x={cx}
            y={cy - 14}
            textAnchor="middle"
            fill="#4c9be8"
            fontSize={10}
          >
            Action taken
          </text>
        </g>
      );
    }
    if (emp.dangerWeek && index === emp.dangerWeek - 1) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={8} fill="#ff4b4b" fillOpacity={0.3} />
          <circle cx={cx} cy={cy} r={4} fill="#ff4b4b" />
          <text
            x={cx}
            y={cy - 14}
            textAnchor="middle"
            fill="#ff4b4b"
            fontSize={10}
          >
            Alert triggered
          </text>
        </g>
      );
    }
    return <circle cx={cx} cy={cy} r={3} fill={TIER_COLORS[emp.tier]} />;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad_${emp.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={TIER_COLORS[emp.tier]}
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor={TIER_COLORS[emp.tier]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e2540" />
        <XAxis dataKey="week" tick={{ fill: "#6b7a99", fontSize: 10 }} />
        <YAxis domain={[0, 100]} tick={{ fill: "#6b7a99", fontSize: 10 }} />
        <Tooltip
          contentStyle={{
            background: "#111627",
            border: "1px solid #1e2540",
            borderRadius: 8,
            color: "#e0e6f0",
            fontSize: 12,
          }}
          formatter={(v) => [`${v}/100`, "Wellness"]}
        />
        <ReferenceLine
          y={50}
          stroke="#ff4b4b"
          strokeDasharray="4 4"
          strokeOpacity={0.5}
          label={{
            value: "Risk threshold",
            fill: "#ff4b4b",
            fontSize: 10,
            position: "right",
          }}
        />
        <Area
          type="monotone"
          dataKey="wellness"
          stroke={TIER_COLORS[emp.tier]}
          strokeWidth={2}
          fill={`url(#grad_${emp.id})`}
          dot={<CustomDot />}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function EmployeeDetail({ emp, onClose, showTrend }) {
  const radarData = Object.entries(emp.pillars).map(([name, val]) => ({
    subject: name,
    value: val,
    fullMark: 100,
  }));
  const [showIntervention, setShowIntervention] = useState(false);

  return (
    <div
      style={{
        background: "#0d1128",
        border: "1px solid #1e2540",
        borderRadius: 16,
        padding: 28,
        marginTop: 20,
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: TIER_BG[emp.tier],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: TIER_COLORS[emp.tier],
            }}
          >
            {emp.id.slice(-2)}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              {emp.id}
            </div>
            <div style={{ fontSize: 13, color: "#6b7a99" }}>
              {emp.role} · {emp.dept} · {emp.tenure.toFixed(1)} yrs tenure
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <TierBadge tier={emp.tier} large />
          <button
            onClick={onClose}
            style={{
              background: "#1e2540",
              border: "none",
              color: "#6b7a99",
              borderRadius: 8,
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Close
          </button>
        </div>
      </div>

      {/* Score cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Wellness Score",
            val: `${emp.wellness.toFixed(1)}/100`,
            color: getPillarColor(emp.wellness),
          },
          {
            label: "Churn Risk",
            val: `${emp.churn.toFixed(1)}%`,
            color: TIER_COLORS[emp.tier],
          },
          {
            label: "Burnout Risk",
            val: `${emp.burnout.toFixed(1)}%`,
            color:
              emp.burnout > 60
                ? "#ff4b4b"
                : emp.burnout > 40
                ? "#ffa500"
                : "#00c853",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#111627",
              border: "1px solid #1e2540",
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#6b7a99",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>
              {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div
        style={{
          background: "#111627",
          border: "1px solid #1e2540",
          borderRadius: 12,
          padding: 18,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#6b7a99",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            12-week wellness trajectory
            {emp.ptoSpike && (
              <span
                style={{
                  marginLeft: 10,
                  background: "rgba(255,165,0,0.15)",
                  color: "#ffa500",
                  padding: "2px 8px",
                  borderRadius: 10,
                  fontSize: 10,
                }}
              >
                PTO spike detected
              </span>
            )}
            {emp.dangerWeek && (
              <span
                style={{
                  marginLeft: 6,
                  background: "rgba(255,75,75,0.15)",
                  color: "#ff4b4b",
                  padding: "2px 8px",
                  borderRadius: 10,
                  fontSize: 10,
                }}
              >
                Alert week {emp.dangerWeek}
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "#6b7a99",
            }}
          >
            <span>Show intervention:</span>
            <div
              onClick={() => setShowIntervention(!showIntervention)}
              style={{
                width: 36,
                height: 20,
                borderRadius: 10,
                background: showIntervention ? "#4c9be8" : "#1e2540",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#fff",
                  position: "absolute",
                  top: 3,
                  left: showIntervention ? 19 : 3,
                  transition: "left 0.2s",
                }}
              />
            </div>
          </div>
        </div>
        <WellnessTrendChart emp={emp} showIntervention={showIntervention} />
        {showIntervention && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background: "rgba(76,155,232,0.08)",
              borderRadius: 8,
              border: "1px solid rgba(76,155,232,0.2)",
              fontSize: 13,
              color: "#8892b0",
            }}
          >
            <span style={{ color: "#4c9be8", fontWeight: 600 }}>
              Week 8 intervention:{" "}
            </span>
            Manager 1:1 + workload rebalanced. Monitor for improvement over next
            2 weeks. If no change by week 10 → escalate to HR.
          </div>
        )}
      </div>

      {/* Pillars + Radar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#6b7a99",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 14,
            }}
          >
            Pillar breakdown — employee view
          </div>
          <PillarBars pillars={emp.pillars} />
        </div>
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#6b7a99",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 14,
            }}
          >
            Radar view
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e2540" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#6b7a99", fontSize: 11 }}
              />
              <Radar
                name={emp.id}
                dataKey="value"
                stroke={TIER_COLORS[emp.tier]}
                fill={TIER_COLORS[emp.tier]}
                fillOpacity={0.15}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Smart Actions */}
      <div
        style={{
          background: "#111627",
          border: "1px solid #1e2540",
          borderRadius: 12,
          padding: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#6b7a99",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Recommended actions — HR view only
          </div>
          <span
            style={{
              fontSize: 11,
              color: "#4c9be8",
              background: "rgba(76,155,232,0.1)",
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            Based on behavioral signals only
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {getSmartActions(emp).map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 8,
                background:
                  emp.tier === "HIGH"
                    ? "rgba(255,75,75,0.06)"
                    : emp.tier === "MEDIUM"
                    ? "rgba(255,165,0,0.06)"
                    : "rgba(0,200,83,0.06)",
                border: `1px solid ${TIER_COLORS[emp.tier]}22`,
              }}
            >
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: TIER_COLORS[emp.tier],
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: TIER_COLORS[emp.tier],
                    marginBottom: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {a.signal}
                </div>
                <div
                  style={{ fontSize: 13, color: "#c0c8e0", lineHeight: 1.5 }}
                >
                  {a.action}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [trendSelected, setTrendSelected] = useState(null);

  const filtered = EMPLOYEES.filter((e) => {
    const matchTier = filter === "all" || e.tier === filter;
    const matchSearch =
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.dept.toLowerCase().includes(search.toLowerCase());
    return matchTier && matchSearch;
  });

  const high = EMPLOYEES.filter((e) => e.tier === "HIGH").length;
  const medium = EMPLOYEES.filter((e) => e.tier === "MEDIUM").length;
  const low = EMPLOYEES.filter((e) => e.tier === "LOW").length;
  const avgW = (
    EMPLOYEES.reduce((s, e) => s + e.wellness, 0) / EMPLOYEES.length
  ).toFixed(1);

  const pieData = [
    { name: "High", value: 217, color: "#ff4b4b" },
    { name: "Medium", value: 56, color: "#ffa500" },
    { name: "Low", value: 1727, color: "#00c853" },
  ];

  const pillarAvg = Object.keys(EMPLOYEES[0].pillars).map((p, i) => ({
    name: p,
    HIGH: Math.round(
      EMPLOYEES.filter((e) => e.tier === "HIGH").reduce(
        (s, e) => s + e.pillars[p],
        0
      ) / high
    ),
    LOW: Math.round(
      EMPLOYEES.filter((e) => e.tier === "LOW").reduce(
        (s, e) => s + e.pillars[p],
        0
      ) / low
    ),
  }));

  const scatterData = EMPLOYEES.map((e) => ({
    x: e.wellness,
    y: e.churn,
    tier: e.tier,
    id: e.id,
  }));

  const declining = [...EMPLOYEES]
    .filter((e) => e.trend < 0)
    .sort((a, b) => a.trend - b.trend);

  return (
    <div
      style={{
        background: "#0a0e1a",
        minHeight: "100vh",
        color: "#e0e6f0",
        fontFamily: "'Segoe UI',system-ui,sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#0a0e1a} ::-webkit-scrollbar-thumb{background:#1e2540;border-radius:3px}
      `}</style>

      {/* HEADER */}
      <div
        style={{
          background: "#0d1128",
          borderBottom: "1px solid #1e2540",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "linear-gradient(135deg,#4c9be8,#7b5ea7)",
              borderRadius: 10,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            P
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              ProCARE Wellness Intelligence
            </div>
            <div style={{ fontSize: 12, color: "#6b7a99" }}>
              Burnout & retention risk platform — 2,000 employees
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <span
            style={{
              background: "rgba(0,200,83,0.12)",
              color: "#00c853",
              border: "1px solid rgba(0,200,83,0.25)",
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Model: 97.8% accuracy
          </span>
          <span
            style={{
              background: "rgba(76,155,232,0.12)",
              color: "#4c9be8",
              border: "1px solid rgba(76,155,232,0.25)",
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            28 features · 7 pillars
          </span>
        </div>
      </div>

      {/* TABS */}
      <div
        style={{
          background: "#0d1128",
          borderBottom: "1px solid #1e2540",
          padding: "0 32px",
          display: "flex",
          gap: 4,
        }}
      >
        {["dashboard", "employees", "trends", "insights"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "14px 18px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              textTransform: "capitalize",
              color: activeTab === tab ? "#4c9be8" : "#6b7a99",
              borderBottom:
                activeTab === tab
                  ? "2px solid #4c9be8"
                  : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1400, margin: "0 auto" }}>
        {/* METRICS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginBottom: 24,
          }}
        >
          <MetricCard
            label="Total Employees"
            value="2,000"
            sub="Active workforce"
            color="#fff"
          />
          <MetricCard
            label="High Risk"
            value="217 (10.8%)"
            sub="Immediate action needed"
            color="#ff4b4b"
          />
          <MetricCard
            label="Medium Risk"
            value="56 (2.8%)"
            sub="Monitor closely"
            color="#ffa500"
          />
          <MetricCard
            label="Avg Wellness Score"
            value={avgW}
            sub="Out of 100"
            color="#4c9be8"
          />
        </div>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "260px 1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  background: "#111627",
                  border: "1px solid #1e2540",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7a99",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 14,
                  }}
                >
                  Risk distribution
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v, n) => [`${v} employees`, n]}
                      contentStyle={{
                        background: "#111627",
                        border: "1px solid #1e2540",
                        borderRadius: 8,
                        color: "#e0e6f0",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {pieData.map((d) => (
                  <div
                    key={d.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: d.color,
                      }}
                    />
                    <span style={{ fontSize: 12, color: "#8892b0", flex: 1 }}>
                      {d.name}
                    </span>
                    <span
                      style={{ fontSize: 12, fontWeight: 600, color: d.color }}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "#111627",
                  border: "1px solid #1e2540",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7a99",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 14,
                  }}
                >
                  Avg pillar scores — HIGH vs LOW risk
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  {[
                    ["#ff4b4b", "High risk"],
                    ["#00c853", "Low risk"],
                  ].map(([c, l]) => (
                    <span
                      key={l}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: "#8892b0",
                      }}
                    >
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 2,
                          background: c,
                          display: "inline-block",
                        }}
                      />
                      {l}
                    </span>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={pillarAvg} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2540" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#6b7a99", fontSize: 10 }}
                    />
                    <YAxis
                      tick={{ fill: "#6b7a99", fontSize: 10 }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#111627",
                        border: "1px solid #1e2540",
                        borderRadius: 8,
                        color: "#e0e6f0",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="HIGH" fill="#ff4b4b" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="LOW" fill="#00c853" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div
                style={{
                  background: "#111627",
                  border: "1px solid #1e2540",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7a99",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 14,
                  }}
                >
                  Churn risk vs wellness score
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2540" />
                    <XAxis
                      dataKey="x"
                      name="Wellness"
                      tick={{ fill: "#6b7a99", fontSize: 10 }}
                      label={{
                        value: "Wellness",
                        position: "bottom",
                        fill: "#6b7a99",
                        fontSize: 11,
                      }}
                    />
                    <YAxis
                      dataKey="y"
                      name="Churn Risk"
                      tick={{ fill: "#6b7a99", fontSize: 10 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#111627",
                        border: "1px solid #1e2540",
                        borderRadius: 8,
                        color: "#e0e6f0",
                        fontSize: 12,
                      }}
                      formatter={(v, n) => [
                        n === "x" ? `${v.toFixed(1)}/100` : `${v.toFixed(1)}%`,
                        n === "x" ? "Wellness" : "Churn Risk",
                      ]}
                    />
                    <Scatter
                      data={scatterData}
                      shape={(p) => {
                        const { cx, cy, payload } = p;
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={5}
                            fill={TIER_COLORS[payload.tier]}
                            fillOpacity={0.7}
                          />
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              style={{
                background: "#111627",
                border: "1px solid #1e2540",
                borderRadius: 14,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#ff4b4b",
                  marginBottom: 16,
                }}
              >
                High risk employees — immediate action required
              </div>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e2540" }}>
                    {[
                      "Employee ID",
                      "Role",
                      "Department",
                      "Wellness",
                      "Churn Risk",
                      "Burnout Risk",
                      "Status",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "8px 12px",
                          color: "#6b7a99",
                          fontWeight: 500,
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EMPLOYEES.filter((e) => e.tier === "HIGH").map((e) => (
                    <tr
                      key={e.id}
                      onClick={() =>
                        setSelected(selected?.id === e.id ? null : e)
                      }
                      style={{
                        borderBottom: "1px solid #1a1f35",
                        cursor: "pointer",
                        background:
                          selected?.id === e.id
                            ? "rgba(76,155,232,0.08)"
                            : "transparent",
                        transition: "background 0.2s",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 12px",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      >
                        {e.id}
                      </td>
                      <td style={{ padding: "10px 12px", color: "#8892b0" }}>
                        {e.role}
                      </td>
                      <td style={{ padding: "10px 12px", color: "#8892b0" }}>
                        {e.dept}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 50,
                              height: 4,
                              background: "#1e2540",
                              borderRadius: 2,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${e.wellness}%`,
                                height: "100%",
                                background: getPillarColor(e.wellness),
                              }}
                            />
                          </div>
                          <span
                            style={{
                              color: getPillarColor(e.wellness),
                              fontWeight: 600,
                            }}
                          >
                            {e.wellness.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#ff4b4b",
                          fontWeight: 700,
                        }}
                      >
                        {e.churn.toFixed(1)}%
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#ffa500",
                          fontWeight: 600,
                        }}
                      >
                        {e.burnout.toFixed(1)}%
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <TierBadge tier={e.tier} />
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#6b7a99",
                          fontSize: 12,
                        }}
                      >
                        Immediate 1:1 + Workload Review
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selected && (
                <EmployeeDetail
                  emp={selected}
                  onClose={() => setSelected(null)}
                />
              )}
            </div>
          </>
        )}

        {/* ── EMPLOYEES TAB ── */}
        {activeTab === "employees" && (
          <div
            style={{
              background: "#111627",
              border: "1px solid #1e2540",
              borderRadius: 14,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID, role, or department..."
                style={{
                  flex: 1,
                  minWidth: 200,
                  background: "#0d1128",
                  border: "1px solid #1e2540",
                  borderRadius: 8,
                  padding: "8px 14px",
                  color: "#e0e6f0",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              {["all", "HIGH", "MEDIUM", "LOW"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    background:
                      filter === t
                        ? TIER_BG[t] || "rgba(76,155,232,0.12)"
                        : "transparent",
                    color:
                      filter === t ? TIER_COLORS[t] || "#4c9be8" : "#6b7a99",
                    borderColor:
                      filter === t
                        ? (TIER_COLORS[t] || "#4c9be8") + "44"
                        : "#1e2540",
                    transition: "all 0.2s",
                  }}
                >
                  {t === "all" ? "All" : t}
                </button>
              ))}
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #1e2540" }}>
                  {[
                    "Employee",
                    "Role",
                    "Dept",
                    "Wellness",
                    "Churn Risk",
                    "Burnout",
                    "Trend",
                    "Tier",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        color: "#6b7a99",
                        fontWeight: 500,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr
                    key={e.id}
                    onClick={() =>
                      setSelected(selected?.id === e.id ? null : e)
                    }
                    style={{
                      borderBottom: "1px solid #1a1f35",
                      cursor: "pointer",
                      background:
                        selected?.id === e.id
                          ? "rgba(76,155,232,0.08)"
                          : "transparent",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 12px",
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      {e.id}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#8892b0" }}>
                      {e.role}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#8892b0" }}>
                      {e.dept}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 60,
                            height: 4,
                            background: "#1e2540",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${e.wellness}%`,
                              height: "100%",
                              background: getPillarColor(e.wellness),
                            }}
                          />
                        </div>
                        <span
                          style={{
                            color: getPillarColor(e.wellness),
                            fontWeight: 600,
                          }}
                        >
                          {e.wellness.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: TIER_COLORS[e.tier],
                        fontWeight: 700,
                      }}
                    >
                      {e.churn.toFixed(1)}%
                    </td>
                    <td style={{ padding: "10px 12px", color: "#8892b0" }}>
                      {e.burnout.toFixed(1)}%
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          color: e.trend < 0 ? "#ff4b4b" : "#00c853",
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        {e.trend > 0 ? "▲" : "▼"} {Math.abs(e.trend).toFixed(2)}
                        /wk
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <TierBadge tier={e.tier} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selected && (
              <EmployeeDetail
                emp={selected}
                onClose={() => setSelected(null)}
              />
            )}
          </div>
        )}

        {/* ── TRENDS TAB ── */}
        {activeTab === "trends" && (
          <>
            {/* Overview line chart */}
            <div
              style={{
                background: "#111627",
                border: "1px solid #1e2540",
                borderRadius: 14,
                padding: 22,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                Company-wide wellness trajectory — 12 weeks
              </div>
              <div style={{ fontSize: 13, color: "#6b7a99", marginBottom: 20 }}>
                Average wellness score per risk tier over time. Declining HIGH
                risk trend signals systemic burnout.
              </div>
              <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
                {[
                  ["#ff4b4b", "High risk avg"],
                  ["#ffa500", "Medium risk avg"],
                  ["#00c853", "Low risk avg"],
                ].map(([c, l]) => (
                  <span
                    key={l}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: "#8892b0",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 3,
                        background: c,
                        display: "inline-block",
                        borderRadius: 2,
                      }}
                    />
                    {l}
                  </span>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={TREND_OVERVIEW}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2540" />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "#6b7a99", fontSize: 11 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: "#6b7a99", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111627",
                      border: "1px solid #1e2540",
                      borderRadius: 8,
                      color: "#e0e6f0",
                      fontSize: 12,
                    }}
                    formatter={(v, n) => [
                      `${v}/100`,
                      n === "HIGH"
                        ? "High risk"
                        : n === "MEDIUM"
                        ? "Medium risk"
                        : "Low risk",
                    ]}
                  />
                  <ReferenceLine
                    y={50}
                    stroke="#ff4b4b"
                    strokeDasharray="4 4"
                    strokeOpacity={0.4}
                    label={{
                      value: "Risk threshold",
                      fill: "#ff4b4b",
                      fontSize: 10,
                      position: "right",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="HIGH"
                    stroke="#ff4b4b"
                    strokeWidth={2.5}
                    dot={{ fill: "#ff4b4b", r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="MEDIUM"
                    stroke="#ffa500"
                    strokeWidth={2.5}
                    dot={{ fill: "#ffa500", r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="LOW"
                    stroke="#00c853"
                    strokeWidth={2.5}
                    dot={{ fill: "#00c853", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 14,
                marginBottom: 16,
              }}
            >
              {[
                {
                  label: "Declining employees",
                  value: "169",
                  sub: "Wellness trending down",
                  color: "#ff4b4b",
                },
                {
                  label: "Improving employees",
                  value: "157",
                  sub: "Wellness trending up",
                  color: "#00c853",
                },
                {
                  label: "PTO spikes detected",
                  value: "78",
                  sub: "Sudden leave behavior",
                  color: "#ffa500",
                },
                {
                  label: "Danger zone reached",
                  value: "253",
                  sub: "Score dropped below 50",
                  color: "#ff4b4b",
                },
              ].map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>

            {/* Rapidly declining list */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  background: "#111627",
                  border: "1px solid #1e2540",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  Most rapidly declining
                </div>
                <div
                  style={{ fontSize: 12, color: "#6b7a99", marginBottom: 16 }}
                >
                  Employees with steepest weekly decline in wellness score
                </div>
                {declining.slice(0, 6).map((e) => (
                  <div
                    key={e.id}
                    onClick={() =>
                      setTrendSelected(trendSelected?.id === e.id ? null : e)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 8,
                      marginBottom: 6,
                      cursor: "pointer",
                      background:
                        trendSelected?.id === e.id
                          ? "rgba(255,75,75,0.08)"
                          : "rgba(255,75,75,0.04)",
                      border: `1px solid ${
                        trendSelected?.id === e.id
                          ? "rgba(255,75,75,0.3)"
                          : "transparent"
                      }`,
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: TIER_BG[e.tier],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: TIER_COLORS[e.tier],
                        flexShrink: 0,
                      }}
                    >
                      {e.id.slice(-2)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}
                      >
                        {e.id}
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7a99" }}>
                        {e.role}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#ff4b4b",
                        }}
                      >
                        ▼ {Math.abs(e.trend).toFixed(2)}/wk
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7a99" }}>
                        {e.weeks[0].toFixed(0)}→{e.weeks[11].toFixed(0)}
                      </div>
                    </div>
                    {e.ptoSpike && (
                      <span
                        style={{
                          background: "rgba(255,165,0,0.15)",
                          color: "#ffa500",
                          fontSize: 10,
                          padding: "2px 6px",
                          borderRadius: 6,
                        }}
                      >
                        PTO↑
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* PTO spike detection */}
              <div
                style={{
                  background: "#111627",
                  border: "1px solid #1e2540",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  PTO & behavioral anomalies
                </div>
                <div
                  style={{ fontSize: 12, color: "#6b7a99", marginBottom: 16 }}
                >
                  Sudden changes in leave behavior — both underuse and spikes
                  are burnout signals
                </div>
                {EMPLOYEES.filter((e) => e.ptoSpike).map((e) => (
                  <div
                    key={e.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 8,
                      marginBottom: 6,
                      background: "rgba(255,165,0,0.05)",
                      border: "1px solid rgba(255,165,0,0.15)",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#ffa500",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}
                      >
                        {e.id}
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7a99" }}>
                        {e.role} · {e.dept}
                      </div>
                    </div>
                    <TierBadge tier={e.tier} />
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 16,
                    padding: 12,
                    background: "rgba(76,155,232,0.06)",
                    borderRadius: 8,
                    border: "1px solid rgba(76,155,232,0.15)",
                    fontSize: 12,
                    color: "#8892b0",
                  }}
                >
                  <span style={{ color: "#4c9be8", fontWeight: 600 }}>
                    Why this matters:{" "}
                  </span>
                  Both extreme PTO underuse (never taking vacation) AND sudden
                  sick leave spikes are statistically significant burnout
                  precursors according to our model.
                </div>
              </div>
            </div>

            {/* Individual trend chart */}
            {trendSelected && (
              <div
                style={{
                  background: "#111627",
                  border: "1px solid #1e2540",
                  borderRadius: 14,
                  padding: 22,
                  animation: "fadeIn 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}
                    >
                      {trendSelected.id} — Individual trend
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7a99" }}>
                      {trendSelected.role} · Slope:{" "}
                      {trendSelected.trend.toFixed(2)} pts/week ·{" "}
                      {trendSelected.weeks[0].toFixed(0)}→
                      {trendSelected.weeks[11].toFixed(0)}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <TierBadge tier={trendSelected.tier} />
                    <button
                      onClick={() => setTrendSelected(null)}
                      style={{
                        background: "#1e2540",
                        border: "none",
                        color: "#6b7a99",
                        borderRadius: 8,
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
                <WellnessTrendChart
                  emp={trendSelected}
                  showIntervention={false}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 10,
                    marginTop: 14,
                  }}
                >
                  {[
                    {
                      label: "Week 1 score",
                      val: `${trendSelected.weeks[0].toFixed(0)}/100`,
                      color: "#4c9be8",
                    },
                    {
                      label: "Week 12 score",
                      val: `${trendSelected.weeks[11].toFixed(0)}/100`,
                      color: getPillarColor(trendSelected.weeks[11]),
                    },
                    {
                      label: "Total decline",
                      val: `${(
                        trendSelected.weeks[0] - trendSelected.weeks[11]
                      ).toFixed(0)} pts`,
                      color: "#ff4b4b",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        background: "#0d1128",
                        borderRadius: 8,
                        padding: "12px 14px",
                        border: "1px solid #1e2540",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "#6b7a99",
                          marginBottom: 4,
                        }}
                      >
                        {s.label}
                      </div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: s.color,
                        }}
                      >
                        {s.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Intervention feedback loop */}
            <div
              style={{
                background: "#111627",
                border: "1px solid #1e2540",
                borderRadius: 14,
                padding: 22,
                marginTop: 16,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                Intervention feedback loop
              </div>
              <div style={{ fontSize: 12, color: "#6b7a99", marginBottom: 20 }}>
                After HR takes action, the system tracks whether wellness scores
                improve. Strategy adapts if there is no change.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  {
                    week: "Week 1",
                    event: "System flags EMP_1172 — churn risk 98.9%",
                    type: "alert",
                    color: "#ff4b4b",
                  },
                  {
                    week: "Week 2",
                    event:
                      "HR notified via dashboard — immediate 1:1 recommended",
                    type: "notify",
                    color: "#ffa500",
                  },
                  {
                    week: "Week 3",
                    event: "Manager completes 1:1. Workload redistributed.",
                    type: "action",
                    color: "#4c9be8",
                  },
                  {
                    week: "Week 5",
                    event:
                      "No improvement detected — wellness still 34/100. Escalate.",
                    type: "escalate",
                    color: "#ff4b4b",
                  },
                  {
                    week: "Week 6",
                    event:
                      "HR intervenes directly. Compensation review initiated.",
                    type: "action",
                    color: "#4c9be8",
                  },
                  {
                    week: "Week 8",
                    event:
                      "Wellness score improving — 34 → 48. Continue monitoring.",
                    type: "improve",
                    color: "#ffa500",
                  },
                  {
                    week: "Week 10",
                    event:
                      "Score reaches 62/100. Risk tier downgraded to MEDIUM.",
                    type: "success",
                    color: "#00c853",
                  },
                  {
                    week: "Week 12",
                    event:
                      "Score 71/100. Employee moved to LOW risk. Intervention successful.",
                    type: "success",
                    color: "#00c853",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: item.color,
                          marginTop: 4,
                        }}
                      />
                      {i < 7 && (
                        <div
                          style={{
                            width: 2,
                            height: 36,
                            background: "#1e2540",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < 7 ? 16 : 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#6b7a99",
                          marginBottom: 2,
                        }}
                      >
                        {item.week}
                      </div>
                      <div style={{ fontSize: 13, color: "#c0c8e0" }}>
                        {item.event}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── INSIGHTS TAB ── */}
        {activeTab === "insights" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div
              style={{
                background: "#111627",
                border: "1px solid #1e2540",
                borderRadius: 14,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                Model performance
              </div>
              {[
                { label: "Algorithm", val: "Random Forest (200 trees)" },
                { label: "Training accuracy", val: "99.4%", color: "#00c853" },
                {
                  label: "Cross-val accuracy",
                  val: "97.8% ± 1.2%",
                  color: "#4c9be8",
                },
                { label: "Employees trained on", val: "2,000" },
                { label: "Features used", val: "28 across 7 pillars" },
                { label: "Sleep data (opt-in)", val: "34% of employees" },
                { label: "Missing data handling", val: "Median imputation" },
                {
                  label: "Privacy",
                  val: "HR sees score only — not raw data",
                  color: "#a78bfa",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #1a1f35",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "#6b7a99" }}>{row.label}</span>
                  <span
                    style={{ color: row.color || "#e0e6f0", fontWeight: 500 }}
                  >
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#111627",
                border: "1px solid #1e2540",
                borderRadius: 14,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                Top predictive signals
              </div>
              {[
                { name: "WellnessScore", importance: 0.38, color: "#4c9be8" },
                { name: "eNPS Score", importance: 0.12, color: "#4c9be8" },
                {
                  name: "Recognition Gap Days",
                  importance: 0.09,
                  color: "#4c9be8",
                },
                {
                  name: "Survey Participation",
                  importance: 0.08,
                  color: "#a78bfa",
                },
                { name: "Feel Supported", importance: 0.07, color: "#a78bfa" },
                { name: "Stress Level", importance: 0.06, color: "#a78bfa" },
                {
                  name: "Recognition Given",
                  importance: 0.05,
                  color: "#34d399",
                },
                { name: "Energy Level", importance: 0.04, color: "#34d399" },
                {
                  name: "Calendar Density",
                  importance: 0.03,
                  color: "#34d399",
                },
                {
                  name: "Time Since Vacation",
                  importance: 0.02,
                  color: "#34d399",
                },
              ].map((f) => (
                <div
                  key={f.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 130,
                      fontSize: 12,
                      color: "#8892b0",
                      flexShrink: 0,
                    }}
                  >
                    {f.name}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      background: "#1e2540",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${f.importance * 250}%`,
                        height: "100%",
                        background: f.color,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: f.color,
                      width: 36,
                      textAlign: "right",
                    }}
                  >
                    {(f.importance * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
