export const services = [
  {
    id: 'dashboards',
    name: 'Dashboards',
    color: '#1F3FD8',
    headline: 'Dashboards people open every morning',
    summary:
      'We design Power BI and web dashboards around the handful of numbers your team decides on, then wire them to live data so nobody rebuilds a report by hand again.',
    deliverables: [
      'KPI definitions agreed with each stakeholder',
      'Power BI reports with clean DAX and data models',
      'Custom React dashboards when Power BI is not enough',
      'Row-level security and scheduled refresh',
    ],
    tools: ['Power BI', 'DAX', 'React', 'D3', 'Tableau'],
  },
  {
    id: 'analytics',
    name: 'Data analytics',
    color: '#0E8F8F',
    headline: 'Answers you can act on, with the reasoning shown',
    summary:
      'From a one-off question to a standing analysis, we dig into your data, test what is really driving the numbers and explain it in plain language.',
    deliverables: [
      'Exploratory analysis and data profiling',
      'Cohort, funnel and retention analysis',
      'Forecasts and scenario models',
      'Written findings your leadership can read in ten minutes',
    ],
    tools: ['SQL', 'Python', 'pandas', 'Jupyter', 'Excel'],
  },
  {
    id: 'engineering',
    name: 'Data engineering',
    color: '#C9730F',
    headline: 'Pipelines that run quietly and fail loudly',
    summary:
      'We build the ingestion, transformation and storage layers that every dashboard and model depends on, with tests and alerts so bad data never reaches a report.',
    deliverables: [
      'ETL and ELT pipelines from APIs, files and databases',
      'Warehouse and lakehouse design',
      'dbt models with tests and documentation',
      'Orchestration, monitoring and cost control',
    ],
    tools: ['dbt', 'Airflow', 'Snowflake', 'Databricks', 'Azure', 'AWS'],
  },
  {
    id: 'ml',
    name: 'Machine learning',
    color: '#7A3FD8',
    headline: 'Models that make it past the notebook',
    summary:
      'We frame the prediction problem, build a baseline worth beating and ship models into production with the monitoring needed to trust them over time.',
    deliverables: [
      'Demand, churn and risk prediction',
      'Classification, clustering and anomaly detection',
      'Model deployment as APIs or batch jobs',
      'Drift monitoring and retraining pipelines',
    ],
    tools: ['scikit-learn', 'XGBoost', 'PyTorch', 'MLflow', 'SageMaker'],
  },
  {
    id: 'ai',
    name: 'AI engineering',
    color: '#D8365A',
    headline: 'AI assistants grounded in your own data',
    summary:
      'We build LLM applications that answer from your documents and databases, with evaluation, guardrails and cost tracking built in from the first release.',
    deliverables: [
      'Retrieval-augmented assistants over company knowledge',
      'Document extraction and classification',
      'Agents that call your internal tools and APIs',
      'Evaluation suites and usage dashboards',
    ],
    tools: ['Claude', 'Amazon Bedrock', 'LangChain', 'pgvector', 'FastAPI'],
  },
];

export const steps = [
  { title: 'Discover', text: 'We map your data sources, the decisions you need to make and what is blocking them today.' },
  { title: 'Design', text: 'You get a written plan: architecture, scope, timeline and what done looks like.' },
  { title: 'Build', text: 'We deliver in two-week cycles and show working results at the end of each one.' },
  { title: 'Hand over', text: 'Documentation, training and a support window so your team owns what we built.' },
];

export const principles = [
  {
    title: 'Scoped to your questions',
    text: 'Every engagement starts from the decisions you need to make, not from a tool we want to sell.',
  },
  {
    title: 'Built to be owned',
    text: 'Code lives in your repositories, models are documented, and your team can run it without us.',
  },
  {
    title: 'Honest about data quality',
    text: 'If the data cannot support the answer yet, we tell you early and fix the foundation first.',
  },
];

// Edit these to describe your actual engagement with each partner.
// To show a real photo, import it at the top of this file and add `photo` and `photoAlt`,
// e.g. import wfpPhoto from '../assets/wfp.jpg';  then  photo: wfpPhoto, photoAlt: '...'
// The same works for each service above.
export const partners = [
  {
    id: 'un',
    name: 'United Nations Sri Lanka',
    short: 'UN Sri Lanka',
    color: '#1B8FD6',
    summary:
      'We support UN teams in Sri Lanka with data engineering and reporting, bringing information from different agencies and field sources into one consistent view.',
    work: [
      'Shared data models across agency datasets',
      'Dashboards for programme and results reporting',
      'Data quality checks before figures are published',
    ],
  },
  {
    id: 'wfp',
    name: 'World Food Programme Sri Lanka',
    short: 'WFP Sri Lanka',
    color: '#0A6EB4',
    summary:
      'We work with WFP Sri Lanka on field data pipelines and monitoring dashboards, so programme teams can follow activities by district as data arrives.',
    work: [
      'Pipelines from mobile field surveys to a central warehouse',
      'District-level monitoring dashboards',
      'Automated weekly and monthly reports',
    ],
  },
];

export const faqs = [
  {
    q: 'Do you work with organisations outside Sri Lanka?',
    a: 'Yes. Most of our work runs remotely, with regular video check-ins and shared project boards, so location is rarely a constraint.',
  },
  {
    q: 'We already use Power BI. Can you work with what we have?',
    a: 'Yes. We often start by fixing the data model and refresh setup behind existing reports before building anything new.',
  },
  {
    q: 'How do you handle sensitive data?',
    a: 'We work inside your cloud accounts wherever possible, follow your access policies, and keep personal data out of development environments.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A focused dashboard or pipeline usually takes 3 to 6 weeks. Machine learning and AI projects start with a 2-week feasibility phase so you know what is realistic before committing further.',
  },
  {
    q: 'Can you support what you build after handover?',
    a: 'Yes. We offer monthly support plans for monitoring, fixes and small improvements, or we can train your team to take it on fully.',
  },
];

// Contact details used across the site.
export const contact = {
  email: 'hello@luminos.co',
  phone: '+94774998116',
  phoneDisplay: '+94 77 499 8116',
};

export const mailto = (subject = 'New project enquiry', body = '') =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export const tel = `tel:${contact.phone}`;

// Client websites shown in the "Projects" section. Screenshots live in assets/projects/.
// To add one: drop a 1200px-wide .webp in that folder, import it here and add an entry.
import shotDmc from '../assets/projects/dmc-elnino.webp';
import shotAyaan from '../assets/projects/ayaan-tours.webp';
import shotBute from '../assets/projects/bute-construction.webp';
import shotYslBuilders from '../assets/projects/ysl-builders.webp';
import shotYslCivils from '../assets/projects/ysl-civils.webp';

export const projects = [
  {
    id: 'dmc',
    name: 'El Niño Preparedness Response',
    client: 'Disaster Management Centre, Sri Lanka',
    url: 'https://dmc-elnino.vercel.app/',
    sector: 'Public sector',
    country: 'Sri Lanka',
    bg: '#0E1B38',
    accent: '#E5B21F',
    art: 'waves',
    shot: shotDmc,
    summary:
      'A public information site explaining how El Niño affects Sri Lanka and the Maha season, with minutes and recordings from every national preparedness meeting.',
    tags: ['Public information', 'Meeting archive', 'Live ENSO data'],
  },
  {
    id: 'ayaan',
    name: 'Ayaan Tours',
    client: 'Private tours from Kandy',
    url: 'https://www.ayaantours.com/',
    sector: 'Travel',
    country: 'Sri Lanka',
    bg: '#13261C',
    accent: '#F29A2E',
    art: 'peaks',
    shot: shotAyaan,
    summary:
      'A bookings-first site for a small Kandy tour team: multi-day trips, safari camping in Yala, Kumana and Wilpattu, day tours and airport transfers, with WhatsApp enquiries.',
    tags: ['Tour catalogue', 'WhatsApp enquiries', 'SEO'],
  },
  {
    id: 'bute',
    name: 'Bute Construction',
    client: 'Civil engineering contractor',
    url: 'https://buteconstruction.co.uk/',
    sector: 'Construction',
    country: 'United Kingdom',
    bg: '#141414',
    accent: '#B7F000',
    art: 'blueprint',
    shot: shotBute,
    summary: 'A bold, project-led site for a civil engineering firm, with a full-screen hero, project portfolio and sustainability pages.',
    tags: ['Portfolio', 'Hero slider'],
  },
  {
    id: 'ysl-builders',
    name: 'YSL Builders',
    client: 'Domestic and commercial builders',
    url: 'https://yslbuilders.co.uk/',
    sector: 'Construction',
    country: 'United Kingdom',
    bg: '#33384D',
    accent: '#F07A5C',
    art: 'skyline',
    shot: shotYslBuilders,
    summary: 'A brand site for a domestic and commercial building company, built around an illustrated city skyline.',
    tags: ['Brand site', 'Illustration'],
  },
  {
    id: 'ysl-civils',
    name: 'YSL Civils',
    client: 'Groundworks and RC frames',
    url: 'https://yslcivils.co.uk/',
    sector: 'Construction',
    country: 'United Kingdom',
    bg: '#1C2660',
    accent: '#F28C28',
    art: 'frame',
    shot: shotYslCivils,
    summary: 'A services site for a groundworks and reinforced concrete frame contractor, with service pages and quote requests.',
    tags: ['Service pages', 'Quote requests'],
  },
];
