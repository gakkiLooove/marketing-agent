const form = document.querySelector("#agentForm");
const tabs = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".tab-panel");
const toast = document.querySelector("#toast");

const defaults = {
  product: "AI 销售线索管理工具",
  audience: "20-80 人的 B2B 创业团队",
  valueProp: "自动整理线索、识别高意向客户、生成跟进建议，帮助销售团队减少手工记录时间。",
  goal: "leads",
  channel: "social",
  tone: "professional",
  budget: "5000",
  timeline: "7",
};

const goalCopy = {
  leads: {
    label: "获取销售线索",
    action: "用高价值资料和预约演示承接需求",
    metric: "有效线索数、预约率、获客成本",
  },
  launch: {
    label: "新品发布",
    action: "用发布节奏和试用名额集中制造关注",
    metric: "发布页访问、试用申请、内容互动",
  },
  retention: {
    label: "提升复购/留存",
    action: "用场景教育和成功案例提升持续使用",
    metric: "激活率、复购率、流失预警恢复率",
  },
  awareness: {
    label: "提升品牌认知",
    action: "用观点内容和行业话题建立记忆点",
    metric: "触达、品牌搜索、关注增长",
  },
};

const channelCopy = {
  social: {
    label: "社媒内容",
    focus: "社媒内容 + 再营销",
    tactic: "用短帖、图文拆解和案例轮播测试 3 个角度，把互动用户导向预约页。",
  },
  search: {
    label: "搜索广告",
    focus: "搜索广告 + 着陆页",
    tactic: "围绕强意图关键词投放，页面首屏直接承接问题、收益和行动按钮。",
  },
  email: {
    label: "邮件营销",
    focus: "邮件序列 + 内容资产",
    tactic: "按认知、比较、决策三类线索发送不同邮件，重点优化打开率和回复率。",
  },
  community: {
    label: "社群运营",
    focus: "社群话题 + 私域转化",
    tactic: "用问题征集、轻量诊断和群内直播建立信任，再引导一对一咨询。",
  },
  webinar: {
    label: "直播/研讨会",
    focus: "主题活动 + 会后跟进",
    tactic: "用高痛点主题召集目标客户，会后按参与深度分层跟进。",
  },
};

const toneCopy = {
  professional: {
    label: "专业可信",
    headline: "把增长动作变成可执行的系统",
    cta: "预约一次方案诊断",
  },
  direct: {
    label: "直接转化",
    headline: "本周开始减少低效获客成本",
    cta: "马上领取增长方案",
  },
  warm: {
    label: "亲和顾问",
    headline: "让每一次客户沟通更有方向",
    cta: "获取专属建议",
  },
  bold: {
    label: "强势增长",
    headline: "别让高意向客户继续流失",
    cta: "启动增长测试",
  },
};

function readInputs() {
  const data = new FormData(form);
  return {
    product: clean(data.get("product")) || defaults.product,
    audience: clean(data.get("audience")) || defaults.audience,
    valueProp: clean(data.get("valueProp")) || defaults.valueProp,
    goal: data.get("goal") || defaults.goal,
    channel: data.get("channel") || defaults.channel,
    tone: data.get("tone") || defaults.tone,
    budget: Number(data.get("budget")) || 0,
    timeline: Number(data.get("timeline")) || 7,
  };
}

function clean(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inferCategory(inputs) {
  const text = `${inputs.product} ${inputs.audience} ${inputs.valueProp}`.toLowerCase();
  if (/saas|b2b|crm|销售|线索|企业|软件|系统|工具/.test(text)) return "B2B 工具";
  if (/课程|教育|训练|学习|培训|知识/.test(text)) return "教育服务";
  if (/餐饮|门店|本地|到店|城市|附近/.test(text)) return "本地服务";
  if (/美妆|食品|服装|消费|品牌|电商|零售/.test(text)) return "消费品牌";
  return "增长项目";
}

function generatePlan(inputs) {
  const goal = goalCopy[inputs.goal];
  const channel = channelCopy[inputs.channel];
  const tone = toneCopy[inputs.tone];
  const category = inferCategory(inputs);
  const budget = splitBudget(inputs.budget);

  return {
    title: `${inputs.product}增长方案`,
    primaryMessage: buildPrimaryMessage(inputs),
    channelFocus: channel.focus,
    budgetSplit: budget.summary,
    positioning: [
      {
        label: "定位",
        text: `${inputs.product}面向${inputs.audience}，核心承诺是${inputs.valueProp}`,
      },
      {
        label: "主线",
        text: `${tone.headline}。先放大目标客户的具体痛点，再用可量化收益降低尝试成本。`,
      },
      {
        label: "动作",
        text: `${goal.action}，并把主要衡量指标收敛到${goal.metric}。`,
      },
      {
        label: "验证",
        text: `用 ${inputs.timeline} 天跑 2-3 个创意角度，每 48 小时淘汰低点击或低咨询版本。`,
      },
    ],
    channels: [
      {
        name: channel.label,
        text: channel.tactic,
      },
      {
        name: "内容资产",
        text: `制作一份和${category}相关的清单、模板或诊断表，作为线索承接物。`,
      },
      {
        name: "再营销",
        text: `对访问过页面、互动过内容但未转化的人群投放痛点对比和客户证据。`,
      },
      {
        name: "销售跟进",
        text: `把线索按意向强弱标记，24 小时内用问题诊断而不是硬推销开场。`,
      },
    ],
    funnel: [
      {
        name: "认知",
        text: `发布痛点型内容：${inputs.audience}为什么会在当前环节损失效率或收入。`,
      },
      {
        name: "兴趣",
        text: `用对比图、案例短帖或轻量测评呈现${inputs.product}的直接收益。`,
      },
      {
        name: "转化",
        text: `提供${tone.cta}，表单只保留姓名、联系方式和核心需求三个字段。`,
      },
      {
        name: "复访",
        text: `针对未转化人群发送客户证据、常见异议回答和限时咨询名额。`,
      },
    ],
    personas: buildPersonas(inputs,),
    adCopy: buildAdcopy(inputs, tone, channel),
    emailCopy: buildEmailCopy(inputs, tone),
    calendar: buildCalendar(inputs, channel, tone, budget),
    summary: buildSummary(inputs, goal, channel, tone, budget),
  };
}

function buildPrimaryMessage(inputs) {
  const value = inputs.valueProp.replace(/[。.!！]/, "");
  if (value.length <= 36) return value;
  return `${value.slice(0, 34)}...`;
}

function splitBudget(budget) {
  if (budget <= 0) {
    return {
      summary: "自然流量优先",
      testing: 0,
      scaling: 0,
      retargeting: 0,
    };
  }
  return {
    summary: `测试 ${Math.round(budget * 0.6).toLocaleString()} / 放量 ${Math.round(budget * 0.4).toLocaleString()}`,
    testing: Math.round(budget * 0.45),
    scaling: Math.round(budget * 0.35),
    retargeting: Math.round(budget * 0.2),
  };
}

function buildPersonas(inputs) {
  return [
    {
      chip: "核心买家",
      title: `正在找解决方案的${inputs.audience}`,
      bullets: [
        `最在意${inputs.product}能否快速解决当前效率或增长问题`,
        "需要看到明确收益、实施成本和同类客户证据",
        "对复杂部署、学习成本和价格不确定性敏感",
      ],
    },
    {
      chip: "影响者",
      title: "负责执行和比较的人",
      bullets: [
        "会收集竞品、案例、价格和使用门槛",
        "偏好清单、模板、对比表和真实工作流截图",
        "容易被可复用资料和低风险试用打动",
      ],
    },
    {
      chip: "潜在拥护者",
      title: "体验后愿意推荐的人",
      bullets: [
        "需要在第一次体验中得到明确成果",
        "愿意分享省时、增收或流程改善的数据",
        "适合引导参与案例共创、社群分享和转介绍",
      ],
    },
  ];
}

function buildAdCopy(inputs, tone, channel) {
  return [
    {
      label: "痛点型",
      title: `${tone.headline}`,
      body: `${inputs.audience}常见的问题不是没有线索，而是线索分散、跟进慢、判断不准。${inputs.product}帮你${inputs.valueProp} ${tone.cta}。`,
    },
    {
      label: "结果型",
      title: `把${inputs.product}接进你的增长流程`,
      body: `从第一条线索到下一次跟进，都有更清晰的优先级。适合${inputs.audience}在本周启动一次小规模测试。`,
    },
    {
      label: "渠道型",
      title: `${channel.label}获客不只看曝光`,
      body: `用内容吸引对的人，用证据筛掉低意向，用及时跟进拿到结果。${tone.cta}，看看你的下一步该怎么跑。`,
    },
  ];
}

function buildEmailCopy(inputs, tone) {
  return [
    {
      label: "主题",
      title: `${inputs.audience}如何少花时间处理低价值线索`,
      body: "",
    },
    {
      label: "开场",
      title: "正文",
      body: `你好，我们最近在帮类似${inputs.audience}的团队梳理获客流程。很多团队的问题不是流量少，而是线索进来后没有被及时判断和跟进。`,
    },
    {
      label: "价值",
      title: "核心段落",
      body: `${inputs.product}可以${inputs.valueProp} 如果你们正在优化获客和转化，我可以基于你们当前流程给一版简短诊断。`,
    },
    {
      label: "行动",
      title: "结尾",
      body: `${tone.cta}，我会把建议控制在可落地的 3 个动作内。`,
    },
  ];
}

function buildCalendar(inputs, channel, tone, budget) {
  const days = [
    {
      theme: "痛点拆解",
      task: `发布${inputs.audience}的 3 个高频痛点，收集评论和私信问题。`,
      metric: "互动率、问题数量",
    },
    {
      theme: "价值证明",
      task: `把${inputs.valueProp}拆成前后对比内容，突出省时或增收。`,
      metric: "点击率、收藏率",
    },
    {
      theme: "承接资产",
      task: "上线清单、模板或诊断表，并把行动按钮统一到同一个页面。",
      metric: "下载数、表单完成率",
    },
    {
      theme: "渠道测试",
      task: `${channel.tactic}${budget.testing ? ` 测试预算约 ${budget.testing.toLocaleString()}。` : ""}`,
      metric: "获客成本、咨询率",
    },
    {
      theme: "异议处理",
      task: "发布价格、实施、效果周期相关的问答内容，降低决策阻力。",
      metric: "页面停留、回复率",
    },
    {
      theme: "客户证据",
      task: "发布案例摘要、数据截图或使用场景故事，强化可信度。",
      metric: "转发、预约数",
    },
    {
      theme: "转化推进",
      task: `${tone.cta}。对互动和访问人群进行再营销与私信跟进。`,
      metric: "预约率、有效线索",
    },
  ];

  return days.slice(0, Math.min(7, inputs.timeline)).map((day, index) => ({
    day: `Day ${index + 1}`,
    ...day,
  }));
}

function buildSummary(inputs, goal, channel, tone, budget) {
  return [
    `产品：${inputs.product}`,
    `目标客户：${inputs.audience}`,
    `营销目标：${goal.label}`,
    `主渠道：${channel.label}`,
    `核心卖点：${inputs.valueProp}`,
    `主诉求：${tone.headline}`,
    `预算节奏：${budget.summary}`,
  ].join("\n");
}

function renderPlan(plan) {
  document.querySelector("#briefTitle").textContent = plan.title;
  document.querySelector("#primaryMessage").textContent = plan.primaryMessage;
  document.querySelector("#channelFocus").textContent = plan.channelFocus;
  document.querySelector("#budgetSplit").textContent = plan.budgetSplit;

  document.querySelector("#positioning").innerHTML = plan.positioning
    .map(
      (item) => `
        <div class="insight-row">
          <span>${escapeHtml(item.label)}</span>
          <p>${escapeHtml(item.text)}</p>
        </div>
      `,
    )
    .join("");

  document.querySelector("#channelPlan").innerHTML = plan.channels
    .map(
      (item) => `
        <div class="stack-item">
          <b>${escapeHtml(item.name)}</b>
          <span>${escapeHtml(item.text)}</span>
        </div>
      `,
    )
    .join("");

  document.querySelector("#funnelPlan").innerHTML = plan.funnel
    .map(
      (item, index) => `
        <div class="funnel-step" data-index="${index + 1}">
          <b>${escapeHtml(item.name)}</b>
          <span>${escapeHtml(item.text)}</span>
        </div>
      `,
    )
    .join("");

  document.querySelector("#personaCards").innerHTML = plan.personas
    .map(
      (persona) => `
        <article class="persona-card">
          <span class="persona-chip">${escapeHtml(persona.chip)}</span>
          <h3>${escapeHtml(persona.title)}</h3>
          <ul>
            ${persona.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");

  document.querySelector("#adCopy").innerHTML = renderCopyItems(plan.adCopy);
  document.querySelector("#emailCopy").innerHTML = renderCopyItems(plan.emailCopy);

  document.querySelector("#calendarGrid").innerHTML = plan.calendar
    .map(
      (item) => `
        <article class="calendar-card">
          <span class="day-pill">${escapeHtml(item.day)}</span>
          <h3>${escapeHtml(item.theme)}</h3>
          <p>${escapeHtml(item.task)}</p>
          <span>${escapeHtml(item.metric)}</span>
        </article>
      `,
    )
    .join("");

  window.currentPlan = plan;
}

function renderCopyItems(items) {
  return items
    .map(
      (item) => `
        <div class="copy-item">
          <span>${escapeHtml(item.label)}</span>
          <b>${escapeHtml(item.title)}</b>
          ${item.body ? `<p>${escapeHtml(item.body)}</p>` : ""}
        </div>
      `,
    )
    .join("");
}

function showToast(message = "已复制") {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("已复制");
  } catch {
    showToast("当前浏览器不支持复制");
  }
}

function textFromElement(id) {
  const element = document.querySelector(`#${id}`);
  return element ? element.innerText.trim() : "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPlan(generatePlan(readInputs()));
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    panels.forEach((panel) => panel.classList.toggle("active", panel.id === target));
  });
});

document.querySelectorAll(".mini-copy").forEach((button) => {
  button.addEventListener("click", () => copyText(textFromElement(button.dataset.copyTarget)));
});

document.querySelector("#copySummary").addEventListener("click", () => {
  copyText(window.currentPlan?.summary || buildSummary(readInputs()));
});

document.querySelector("#resetForm").addEventListener("click", () => {
  Object.entries(defaults).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value;
  });
  renderPlan(generatePlan(readInputs()));
});

renderPlan(generatePlan(readInputs()));
