const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = sectionLinks.map(link => document.querySelector(link.hash));
function setCurrentSection() {
  let current = sections[0];
  sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) current = section; });
  sectionLinks.forEach(link => {
    const active = link.hash === '#' + current.id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}
let scheduled = false;
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(() => { setCurrentSection(); scheduled = false; });
  }
}, { passive: true });
setCurrentSection();

// Translate the original text nodes so links, images, and section anchors stay intact.
const languageTranslations = new Map(Object.entries({
  "深圳国际量子研究院吴步娇量子算法课题组，研究量子测量、量子学习、量子线路优化与量子纠错。查看课题组成员、近五年论文及联合培养博士生和博士后招募信息。": "Bujiao Wu's Quantum Algorithms Group at Shenzhen International Quantum Academy studies quantum measurement, quantum learning, quantum circuit optimization, and quantum error correction. Explore our group members, publications from the past five years, and opportunities for joint PhD students and postdoctoral fellows.",
  "量子算法课题组 · 吴步娇 | 深圳国际量子研究院": "Quantum Algorithms Group · Bujiao Wu | Shenzhen International Quantum Academy",
  "跳转到正文": "Skip to main content",
  "课题组首页": "Group home",
  "深圳国际量子研究院 Shenzhen International Quantum Academy": "Shenzhen International Quantum Academy",
  "导航菜单": "Navigation menu",
  "主导航": "Main navigation",
  "课题组情况": "Our Group",
  "论文发表": "Publications",
  "招生需求": "Join Us",
  "联系课题组": "Contact Us",
  "量子算法": "Quantum Algorithms",
  "课题组": "Group",
  "量子计算与量子信息理论": "Quantum Computing and Quantum Information Theory",
  "围绕量子测量、量子学习、线路优化与量子纠错，": "We study quantum measurement, quantum learning, circuit optimization, and quantum error correction, ",
  "研究量子算法的理论与实现。": "exploring the theory and implementation of quantum algorithms.",
  "浏览研究论文": "Explore Publications",
  "加入课题组": "Join Our Group",
  "以数学与计算机科学方法，": "Using methods from mathematics and computer science, ",
  "探索量子信息处理的可能性。": "we explore the possibilities of quantum information processing.",
  "研究方向": "Research Areas",
  "课题组聚焦量子算法与量子信息理论，主要研究内容包含但不仅限于": "Our group focuses on quantum algorithms and quantum information theory, with research areas including, but not limited to:",
  "随机测量的优化": "Optimizing Randomized Measurements",
  "量子测量方法与资源优化": "Quantum measurement methods and resource optimization",
  "隐信道的学习": "Learning Hidden Quantum Channels",
  "量子信道学习理论": "Theory of quantum channel learning",
  "量子误差信道的基准": "Benchmarking Quantum Error Channels",
  "噪声信道的表征与评估": "Characterizing and evaluating noisy channels",
  "量子线路的优化与学习": "Quantum Circuit Optimization and Learning",
  "线路资源优化与学习方法": "Circuit resource optimization and learning methods",
  "量子纠错": "Quantum Error Correction",
  "量子纠错理论与方法": "Quantum error correction theory and methods",
  "量子近期算法设计": "Near-Term Quantum Algorithm Design",
  "面向近期量子设备的算法": "Algorithms for near-term quantum devices",
  "课题组成员": "Group Members",
  "研究 · 协作 · 探索": "Research · Collaboration · Discovery",
  "PI 吴步娇": "PI Bujiao Wu",
  "吴步娇": "Bujiao Wu",
  "副研究员 · 深圳国际量子研究院": "Associate Researcher · Shenzhen International Quantum Academy",
  "量子算法与量子信息理论": "Quantum algorithms and quantum information theory",
  "何泽坤": "Zekun He",
  "博士后": "Postdoctoral Fellow",
  "余睿": "Rui Yu",
  "研究助理 · RA": "Research Assistant · RA",
  "林桐音": "Tongyin Lin",
  "李辉成：尚未添加头像": "Huicheng Li: photo not yet added",
  "尚未添加头像": "Photo not yet added",
  "深圳大学联培硕士生": "Joint Master's Student · Shenzhen University",
  "李辉成": "Huicheng Li",
  "张智豪：尚未添加头像": "Zhihao Zhang: photo not yet added",
  "张智豪": "Zhihao Zhang",
  "科研项目与人才计划": "Research Projects and Talent Programs",
  "国量院个人简介": "SIQA Profile",
  "主持项目": "Current Project",
  "国家自然科学基金青年科学基金项目（国自然青基）": "National Natural Science Foundation of China (NSFC) — Young Scientists Fund",
  "主持人：吴步娇": "PI: Bujiao Wu",
  "曾主持项目与人才计划": "Previous Projects and Talent Programs",
  "国家自然科学基金物理专项": "NSFC Special Program in Physics",
  "已结题": "Completed",
  "之江实验室青年国际人才基金": "Zhejiang Lab Young International Talent Fund",
  "博士后国际交流计划": "International Postdoctoral Exchange Program",
  "近五个自然年": "Past five calendar years",
  "按正式发表年份整理；公开预印本单列。论文标题链接至原始文献。": "Organized by year of publication, with public preprints listed separately. Paper titles link to the original publications.",
  "期刊论文": "Journal Article",
  "会议论文": "Conference Paper",
  "预印本": "Preprint",
  "收录截至2026年9月30日可核验的公开成果。更多个人研究成果见": "Includes publicly verifiable research outputs as of September 30, 2026. For more research outputs, see ",
  "。": ".",
  "欢迎对量子计算与量子信息理论": "We welcome students and early-career researchers",
  "有兴趣的同学和青年研究者联系。": "interested in quantum computing and quantum information theory to contact us.",
  "拟招 1–2 名": "1–2 anticipated openings",
  "联合培养博士生": "Joint PhD Students",
  "香港科技大学（广州） / 澳门大学": "The Hong Kong University of Science and Technology (Guangzhou) / University of Macau",
  "申请背景": "Applicant Background",
  "计算机或物理专业的优秀本科生、硕士生；了解量子计算与量子信息理论，具有扎实的数学基础、科研热情和良好的英文文献阅读能力。": "Outstanding undergraduate or master's students in computer science or physics, with knowledge of quantum computing and quantum information theory, a solid foundation in mathematics, enthusiasm for research, and the ability to read academic literature in English.",
  "量子算法设计、量子纠错及面向量子硬件的算法研究。": "Quantum algorithm design, quantum error correction, and algorithms for quantum hardware.",
  "初次联系": "How to Get in Touch",
  "欢迎发送个人简历、研究兴趣及已有的相关研究材料。": "Please send your CV, research interests, and any relevant research materials.",
  "咨询博士生申请": "Enquire About PhD Applications",
  "具体项目、申请资格及培养安排以合作高校正式招生文件为准。": "Program details, eligibility, and training arrangements are subject to the partner universities' official admissions documents.",
  "拟招 1 名": "1 anticipated opening",
  "量子算法与量子信息方向": "Quantum Algorithms and Quantum Information",
  "计算机或物理相关专业，已获得或即将获得博士学位；具有量子算法与量子信息研究基础、相关论文积累。": "Applicants should hold or be close to completing a PhD in computer science, physics, or a related field, with research experience and publications in quantum algorithms and quantum information.",
  "量子纠错、量子算法设计及量子硬件上的算法实现。": "Quantum error correction, quantum algorithm design, and algorithm implementation on quantum hardware.",
  "欢迎发送个人简历、代表性成果及拟开展研究的简要设想。": "Please send your CV, representative research outputs, and a brief outline of your proposed research.",
  "咨询博士后岗位": "Enquire About the Postdoctoral Position",
  "具体进站要求、聘期、待遇与到岗安排请邮件咨询。": "Please email us for details on eligibility, appointment duration, compensation, and start dates.",
  "与我们交流你的研究兴趣": "Share Your Research Interests",
  "吴步娇 · 深圳国际量子研究院": "Bujiao Wu · Shenzhen International Quantum Academy",
  "量子算法课题组": "Quantum Algorithms Group",
  "深圳国际量子研究院": "Shenzhen International Quantum Academy",
  "内容更新：2026年9月30日": "Last updated: September 30, 2026",
  "联培博士申请": "Joint PhD Application",
  "博士后申请": "Postdoctoral Application",
  "选择语言": "Choose language",
  "显示中文": "Show Chinese",
  "显示英文": "Show English"
}));

const languageButtons = [...document.querySelectorAll('[data-language]')];
const languageStatus = document.querySelector('.language-status');
const textTranslations = [];
const textWalker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  if (node.parentElement?.closest('script, style, noscript')) continue;
  const original = node.nodeValue;
  const key = original.trim();
  if (!languageTranslations.has(key)) continue;
  let english = languageTranslations.get(key);
  if (node.parentElement.matches('.preprints > h3')) english = 'Preprints';
  textTranslations.push({ node, original, english: original.replace(key, english) });
}
const attributeTranslations = [];
document.querySelectorAll('[aria-label], [alt], [title], meta[name="description"]').forEach(element => {
  ['aria-label', 'alt', 'title', 'content'].forEach(attribute => {
    const original = element.getAttribute(attribute);
    if (original && languageTranslations.has(original.trim())) {
      attributeTranslations.push({ element, attribute, original, english: languageTranslations.get(original.trim()) });
    }
  });
});
const applicationLinks = [...document.querySelectorAll('a[data-subject-en]')].map(element => ({
  element,
  original: element.getAttribute('href'),
  english: element.getAttribute('href').split('?')[0] + '?subject=' + encodeURIComponent(element.dataset.subjectEn)
}));
function applyLanguage(language, announce = false) {
  const english = language === 'en';
  document.documentElement.lang = english ? 'en' : 'zh-CN';
  textTranslations.forEach(record => { record.node.nodeValue = english ? record.english : record.original; });
  attributeTranslations.forEach(record => { record.element.setAttribute(record.attribute, english ? record.english : record.original); });
  applicationLinks.forEach(record => { record.element.setAttribute('href', english ? record.english : record.original); });
  languageButtons.forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === document.documentElement.lang)); });
  if (announce) languageStatus.textContent = english ? 'Language changed to English.' : '已切换为中文。';
  setCurrentSection();
}
languageButtons.forEach(button => button.addEventListener('click', () => {
  const language = button.dataset.language;
  applyLanguage(language, true);
  try { localStorage.setItem('quantum-group-language', language); } catch {}
}));
let preferredLanguage = 'zh-CN';
try {
  if (localStorage.getItem('quantum-group-language') === 'en') preferredLanguage = 'en';
} catch {}
applyLanguage(preferredLanguage);
