/**
 * content.mjs
 * ---------------------------------------------------------------------------
 * Every word on the site, in English and Portuguese, in one place.
 * The template (template.mjs) only arranges these strings; edit text here.
 *
 * Rules for this copy:
 *   - Facts come from real, delivered work. The employer and clients are not
 *     named; no client data, IDs or private numbers.
 *   - Contact is email only (no phone), by the owner's choice.
 *   - Plain, first-person sentences. No buzzwords.
 * ---------------------------------------------------------------------------
 */

export const SITE_URL = 'https://igor-hoc-cruz.github.io';
export const EMAIL = 'Igorhoc0@gmail.com';
export const GITHUB = 'https://github.com/igor-hoc-cruz';
export const LINKEDIN = 'https://www.linkedin.com/in/igor-henrique-de-oliveira-cruz-71066921b';

/* ===== Flow diagrams for the featured cases =============================
 * Each flow is a list of stages read left to right; a stage with two nodes
 * is a branch. `gate` is the stage drawn in ruby (the decision point).
 * ======================================================================== */
const FLOWS = {
  'ai-agents': {
    gate: 3,
    en: [['A marketing request'], ['Routed to 1 of 13 areas'], ['A specialist agent does the work'], ['Human approval'], ['Publish, send or spend']],
    pt: [['Um pedido de marketing'], ['Roteado para 1 de 13 áreas'], ['Um agente especialista faz o trabalho'], ['Aprovação humana'], ['Publicar, enviar ou gastar']],
  },
  'lost-leads': {
    gate: 2,
    en: [['Meta lead form'], ['n8n route'], ['Phone already in the CRM?'], ['New: create the lead', 'Known: re-entry on the new product'], ['Any failure raises an alert']],
    pt: [['Formulário da Meta'], ['Rota no n8n'], ['Telefone já está no CRM?'], ['Novo: cria o lead', 'Conhecido: reentrada no produto novo'], ['Toda falha gera alerta']],
  },
  'kpi-dashboards': {
    gate: 2,
    en: [['Meta', 'TikTok', 'CRM'], ['Existing flows, read-only'], ['Zoho Analytics'], ['Dashboard: 8 cards, 9 charts', 'Office TV: 4 screens, 30 s each']],
    pt: [['Meta', 'TikTok', 'CRM'], ['Fluxos existentes, só leitura'], ['Zoho Analytics'], ['Painel: 8 cards, 9 gráficos', 'TV: 4 telas, 30 s cada']],
  },
};

/* ===== Case studies =====================================================
 * tag      : filter group (see `filters` in each language)
 * status   : live | progress | delivered | personal
 * featured : shown as a large, always-open study at the top of the work
 * metric   : one headline number for the card ({ value, en, pt })
 * did      : list of steps (each one sentence)
 * ======================================================================== */
const CASES = [
  /* ----- Featured ----- */
  {
    id: 'ai-agents', tag: 'ai', status: 'live', featured: true,
    metric: { value: '13', en: 'areas served', pt: 'áreas atendidas' },
    tools: ['Claude and Claude Code', 'MCP connectors', 'Scheduled tasks', 'Knowledge bases', 'n8n'],
    en: {
      title: 'Marketing operations run by AI agents, with a human holding the keys',
      summary: 'More requests than a lean team could handle, and a real risk of AI acting on its own. I built the system that does the work and asks before it acts.',
      role: 'Designed and built it end to end, and I operate it day to day.',
      problem: 'Marketing requests kept piling up across ads, email, sites and reports, and handing work to AI risked it publishing, spending or changing data without anyone noticing.',
      did: [
        'Mapped the work into 13 areas, each with its own specialist instructions and knowledge base for the brand and for Zoho.',
        'Required human approval before any outside action: publishing, spending, sending or changing data.',
        'Gave every task concrete completion checks, so "done" always means verified.',
        'Cut the context each request loads, which reduced token use per request by 60 to 87 percent.',
      ],
      result: 'Requests flow through one system with compliance rules applied by default, a full history of what was done, and nothing leaving the building without approval.',
    },
    pt: {
      title: 'Operação de marketing com agentes de IA, e um humano com a chave',
      summary: 'Mais pedidos do que uma equipe enxuta dava conta, e um risco real de a IA agir sozinha. Construí o sistema que faz o trabalho e pergunta antes de agir.',
      role: 'Desenhei e construí de ponta a ponta, e opero no dia a dia.',
      problem: 'Os pedidos de marketing se acumulavam entre anúncios, e-mail, sites e relatórios, e entregar trabalho para a IA trazia o risco de ela publicar, gastar ou alterar dados sem ninguém ver.',
      did: [
        'Organizei o trabalho em 13 áreas, cada uma com instruções próprias e base de conhecimento da marca e da Zoho.',
        'Exigi aprovação humana antes de qualquer ação externa: publicar, gastar, enviar ou alterar dados.',
        'Dei a cada tarefa critérios concretos de conclusão, para que "pronto" sempre signifique verificado.',
        'Enxuguei o contexto que cada pedido carrega, reduzindo o consumo de tokens por pedido em 60% a 87%.',
      ],
      result: 'Os pedidos passam por um único sistema, com regras de compliance por padrão, histórico completo do que foi feito e nada saindo de casa sem aprovação.',
    },
  },
  {
    id: 'lost-leads', tag: 'automation', status: 'live', featured: true,
    metric: { value: '50%', en: 'of one campaign’s leads recovered', pt: 'dos leads de uma campanha recuperados' },
    tools: ['n8n', 'Zapier', 'Zoho CRM API', 'Meta Lead Ads'],
    en: {
      title: 'Ad leads that vanished before becoming deals',
      summary: 'Half of one campaign’s leads were being dropped without a trace. I found the silent rejection and rebuilt the route around it.',
      role: 'Diagnosed the failure and rebuilt the integration.',
      problem: 'The CRM refused, with no warning, any lead whose phone number was already on file, so half the leads from one Meta campaign never turned into deals, and no one was told.',
      did: [
        'Traced the failed runs in n8n until the rejection rule showed up.',
        'Rebuilt the route with duplicate handling and re-entry when the person asks about a new product.',
        'Added alerts on every failure and moved all sources to the company’s official field standard.',
      ],
      result: 'The lost leads came back as deals, failures now raise an alert, and every source sends channel, UTMs and ad IDs.',
    },
    pt: {
      title: 'Leads de anúncio que sumiam antes de virar negócio',
      summary: 'Metade dos leads de uma campanha se perdia sem deixar rastro. Achei a recusa silenciosa e refiz a rota em volta dela.',
      role: 'Diagnostiquei a falha e reconstruí a integração.',
      problem: 'O CRM recusava em silêncio qualquer lead com telefone já cadastrado, então metade dos leads de uma campanha da Meta nunca virava negócio, e ninguém era avisado.',
      did: [
        'Rastreei as execuções com falha no n8n até a regra de recusa aparecer.',
        'Refiz a rota com tratamento de duplicados e reentrada quando a pessoa pede um produto novo.',
        'Coloquei alerta em toda falha e levei todas as fontes para o padrão oficial de campos da empresa.',
      ],
      result: 'Os leads perdidos voltaram como negócios, toda falha gera alerta e todas as fontes enviam canal, UTMs e IDs do anúncio.',
    },
  },
  {
    id: 'kpi-dashboards', tag: 'data', status: 'live', featured: true,
    metric: { value: '17', en: 'live charts and cards', pt: 'gráficos e cards ao vivo' },
    tools: ['Zoho Analytics', 'n8n', 'Postgres', 'Meta and TikTok data'],
    en: {
      title: 'Live KPI dashboards, all the way to the office TV',
      summary: 'Numbers were scattered across ad platforms, the CRM and the automations. Now they sit on one screen the whole team can see.',
      role: 'Built the data model, the dashboards and the TV rotation.',
      problem: 'Results were spread across ad platforms, the CRM and the automations, so every question meant opening several tools, each counting in its own way.',
      did: [
        'Pulled ad, social and CRM data through the flows that already existed, read-only, so nothing in production could break.',
        'Built a KPI dashboard with 8 cards and 9 charts in Zoho Analytics.',
        'Set up an office TV that rotates four screens every 30 seconds, plus a second board with live conversation data from Postgres.',
      ],
      result: 'One shared view of the funnel, updated on its own, that never writes to the systems it reads from.',
    },
    pt: {
      title: 'Painéis de KPI ao vivo, até a TV do escritório',
      summary: 'Os números estavam espalhados entre plataformas de anúncio, CRM e automações. Agora ficam numa tela que o time inteiro vê.',
      role: 'Montei o modelo de dados, os painéis e o rodízio da TV.',
      problem: 'Os resultados estavam espalhados entre plataformas de anúncio, CRM e automações, e cada pergunta exigia abrir várias ferramentas, cada uma contando do seu jeito.',
      did: [
        'Puxei os dados de anúncios, redes sociais e CRM pelos fluxos que já existiam, só leitura, para nada em produção quebrar.',
        'Construí um painel de KPI com 8 cards e 9 gráficos no Zoho Analytics.',
        'Configurei uma TV no escritório que alterna quatro telas a cada 30 segundos, e um segundo painel com conversas ao vivo vindas do Postgres.',
      ],
      result: 'Uma visão única do funil, atualizada sozinha, que nunca escreve nos sistemas de onde lê.',
    },
  },

  /* ----- More work: short, generic summaries (no exact figures, no status) ----- */
  {
    id: 'deliverability', tag: 'email',
    tools: ['GoHighLevel', 'Zoho Marketing Automation', 'Cloudflare DNS', 'SPF, DKIM and DMARC'],
    en: {
      title: 'Getting a high-volume email sender back on track',
      summary: 'Authenticated the sender, cleaned the lists and brought the domain to a steady sending pace.',
      problem: 'A lot of email going out, too many bounces, and a domain whose DNS settings were working against it.',
      did: [
        'Reviewed and corrected the domain’s email authentication.',
        'Set up a dedicated return path.',
        'Removed invalid addresses and problem domains from the lists.',
      ],
      result: 'The sender passes the standard authentication checks and sends at a steady, healthy volume.',
    },
    pt: {
      title: 'Colocando um remetente de alto volume nos trilhos',
      summary: 'Autentiquei o remetente, limpei as listas e levei o domínio a um ritmo de envio estável.',
      problem: 'Muito e-mail saindo, rejeição alta e um domínio com configurações de DNS trabalhando contra ele.',
      did: [
        'Revisei e corrigi a autenticação de e-mail do domínio.',
        'Criei um caminho de retorno dedicado.',
        'Tirei das listas os endereços inválidos e os domínios problemáticos.',
      ],
      result: 'O remetente passa nas checagens padrão de autenticação e envia num volume estável e saudável.',
    },
  },
  {
    id: 'whatsapp-import', tag: 'automation',
    tools: ['n8n', 'WhatsApp gateway', 'Zoho CRM API'],
    en: {
      title: 'Bringing WhatsApp conversations into the CRM without duplicates',
      summary: 'Contacts who had only talked to the company on WhatsApp now exist in the CRM, once each.',
      problem: 'Many contacts lived only inside WhatsApp, so the sales team could not follow up or measure them.',
      did: [
        'Built an automation that reads contacts from the WhatsApp gateway and checks each number against the CRM first.',
        'Created the new leads with their language and a batch tag, so every import can be traced.',
        'Ran each language separately and switched the flow off when it was done.',
      ],
      result: 'New leads in the CRM for follow-up, and existing contacts left untouched.',
    },
    pt: {
      title: 'Trazendo conversas de WhatsApp para o CRM, sem duplicados',
      summary: 'Quem só tinha falado com a empresa pelo WhatsApp agora existe no CRM, uma vez só.',
      problem: 'Muitos contatos viviam só dentro do WhatsApp, e o time comercial não conseguia acompanhar nem medir.',
      did: [
        'Construí uma automação que lê os contatos do gateway de WhatsApp e confere cada número no CRM antes.',
        'Criei os leads novos com idioma e uma tag de lote, para toda importação ser rastreável.',
        'Rodei cada idioma separado e desliguei o fluxo ao terminar.',
      ],
      result: 'Leads novos no CRM para acompanhamento, e os contatos existentes preservados.',
    },
  },
  {
    id: 'lead-source', tag: 'data',
    tools: ['n8n API', 'JavaScript', 'Zoho Analytics', 'Automated tests'],
    en: {
      title: 'Finding where leads really come from',
      summary: 'Most leads arrived without a source. I found the technical cause and designed a read-only way to classify them.',
      problem: 'Without a recorded source, nobody could tell what each channel really cost.',
      did: [
        'Traced the cause to a form embedded in a way that hid the page’s campaign tags.',
        'Designed a separate, read-only flow that classifies each lead’s channel.',
        'Covered the classification rules with automated tests.',
      ],
      result: 'A tested way to classify channels, built without touching anything in production.',
    },
    pt: {
      title: 'Descobrindo de onde os leads vêm de verdade',
      summary: 'A maioria dos leads chegava sem origem. Achei a causa técnica e desenhei um jeito só de leitura de classificá-los.',
      problem: 'Sem origem registrada, ninguém sabia quanto cada canal custava de verdade.',
      did: [
        'Rastreei a causa até um formulário incorporado de um jeito que escondia as tags de campanha da página.',
        'Desenhei um fluxo separado, só de leitura, que classifica o canal de cada lead.',
        'Cobri as regras de classificação com testes automatizados.',
      ],
      result: 'Um jeito testado de classificar canais, construído sem mexer em nada de produção.',
    },
  },
  {
    id: 'trilingual-site', tag: 'web',
    tools: ['WordPress', 'Elementor', 'HTML, CSS and JS', 'Google Tag Manager', 'Meta Pixel'],
    en: {
      title: 'Moving a company site to WordPress in three languages',
      summary: 'Migrated the whole site, kept every address working and measured every download.',
      problem: 'The site was on an old platform, incomplete in two of its languages and slow on phones.',
      did: [
        'Migrated the pages to WordPress and Elementor with their addresses preserved.',
        'Optimised images and video, and set up SEO and share cards.',
        'Built guide and e-book pages with forms, each download tracked as a conversion.',
      ],
      result: 'A faster site in three languages where every material download is measured.',
    },
    pt: {
      title: 'Levando o site de uma empresa para o WordPress em três idiomas',
      summary: 'Migrei o site inteiro, mantive todos os endereços funcionando e medi cada download.',
      problem: 'O site estava numa plataforma antiga, incompleto em dois idiomas e lento no celular.',
      did: [
        'Migrei as páginas para WordPress e Elementor com os endereços preservados.',
        'Otimizei imagens e vídeo e configurei SEO e cartões de compartilhamento.',
        'Criei páginas de guias e e-books com formulário, cada download medido como conversão.',
      ],
      result: 'Um site mais rápido em três idiomas, com cada download de material medido.',
    },
  },
  {
    id: 'renewal-portal', tag: 'web',
    tools: ['WordPress', 'n8n', 'Online payments', 'JavaScript'],
    en: {
      title: 'A self-service renewal portal',
      summary: 'Clients review next year’s plan and pay online, on a page powered by an automation.',
      problem: 'Clients needed a way to review and renew their plan on their own, without waiting for a call.',
      did: [
        'Built a site page that loads a multi-step flow served by n8n.',
        'Built a step-by-step quote form.',
        'Connected online card payments.',
      ],
      result: 'Renewals that clients can finish on their own, at any time.',
    },
    pt: {
      title: 'Um portal de renovação para o próprio cliente',
      summary: 'O cliente revisa o plano do ano seguinte e paga online, numa página movida por uma automação.',
      problem: 'Os clientes precisavam revisar e renovar o plano sozinhos, sem esperar uma ligação.',
      did: [
        'Construí uma página no site que carrega um fluxo de várias etapas servido pelo n8n.',
        'Montei um formulário de cotação passo a passo.',
        'Conectei o pagamento online com cartão.',
      ],
      result: 'Renovações que o cliente conclui sozinho, a qualquer hora.',
    },
  },
  {
    id: 'aca-calculator', tag: 'data',
    tools: ['Public federal data', 'JavaScript', 'Data modelling'],
    en: {
      title: 'A health plan calculator built on public data',
      summary: 'It shows real plan prices from public federal data, with eligibility checks and a carrier filter.',
      problem: 'Visitors wanted to know what a plan would really cost before talking to anyone.',
      did: [
        'Modelled the public federal plan files.',
        'Added eligibility checks and a filter by carrier.',
        'Built the page so more regions can be added over time.',
      ],
      result: 'Visitors see real prices for their situation instead of generic estimates.',
    },
    pt: {
      title: 'Uma calculadora de planos de saúde feita com dados públicos',
      summary: 'Mostra preços reais de planos a partir de dados públicos federais, com elegibilidade e filtro de operadora.',
      problem: 'Os visitantes queriam saber quanto um plano custaria de verdade antes de falar com alguém.',
      did: [
        'Modelei os arquivos públicos federais de planos.',
        'Coloquei checagem de elegibilidade e filtro por operadora.',
        'Construí a página para novas regiões entrarem com o tempo.',
      ],
      result: 'O visitante vê preços reais para a sua situação, em vez de estimativas genéricas.',
    },
  },
  {
    id: 'auto-quote', tag: 'web',
    tools: ['WordPress plugin', 'PHP', 'Rating API', 'Supabase'],
    en: {
      title: 'Bringing a quote app inside WordPress',
      summary: 'The quote flow lived on separate hosting. I rebuilt it as a plugin inside the company site.',
      problem: 'An external app meant another host to pay for, another place to break and visitors bouncing between domains.',
      did: [
        'Rebuilt the flow as a WordPress plugin with a local catalog.',
        'Kept the rating service and the database that already worked.',
        'Published the quote pages in the site’s languages.',
      ],
      result: 'Quotes run inside the company site, with no external hosting to maintain.',
    },
    pt: {
      title: 'Trazendo um app de cotação para dentro do WordPress',
      summary: 'O fluxo de cotação morava numa hospedagem separada. Reconstruí como plugin dentro do site da empresa.',
      problem: 'Um app externo significava mais uma hospedagem para pagar, mais um lugar para quebrar e o visitante pulando entre domínios.',
      did: [
        'Reconstruí o fluxo como plugin WordPress, com catálogo local.',
        'Mantive o serviço de cotação e o banco de dados que já funcionavam.',
        'Publiquei as páginas de cotação nos idiomas do site.',
      ],
      result: 'As cotações rodam dentro do site da empresa, sem hospedagem externa para manter.',
    },
  },
  {
    id: 'tiktok-data', tag: 'data',
    tools: ['TikTok Marketing API', 'OAuth', 'n8n', 'Zoho Analytics'],
    en: {
      title: 'Bringing TikTok Ads into the company’s own reports',
      summary: 'Got access to the ads data approved and set up a daily feed into the reporting tool.',
      problem: 'Ads kept getting rejected with no clear reason, and campaign numbers were stuck inside TikTok.',
      did: [
        'Identified the policy rule behind the rejections and filed the review.',
        'Got API access approved with read-only permissions.',
        'Reviewed the creatives to show which messages pass the policy.',
      ],
      result: 'Campaign, ad group and ad data arrive in the company’s reports every day.',
    },
    pt: {
      title: 'Trazendo o TikTok Ads para os relatórios da empresa',
      summary: 'Aprovei o acesso aos dados de anúncios e montei uma coleta diária para a ferramenta de relatórios.',
      problem: 'Os anúncios eram reprovados sem motivo claro e os números de campanha ficavam presos no TikTok.',
      did: [
        'Identifiquei a regra de política por trás das reprovações e abri a revisão.',
        'Aprovei o acesso à API só com permissões de leitura.',
        'Analisei os criativos para mostrar quais mensagens passam na política.',
      ],
      result: 'Dados de campanhas, grupos e anúncios chegam todo dia aos relatórios da empresa.',
    },
  },
  {
    id: 'hr-portal', tag: 'web',
    tools: ['PHP', 'WordPress REST API', 'Zoho Sign API', 'JavaScript'],
    en: {
      title: 'An HR portal that lives inside the company site',
      summary: 'Custom WordPress plugins for onboarding, requests and contracts signed electronically.',
      problem: 'Contractor agreements and onboarding were done by hand, in loose documents with no history.',
      did: [
        'Wrote WordPress plugins for access, requests and an audit trail.',
        'Sent filled-in contracts for electronic signature.',
        'Tested every release locally before it went live.',
      ],
      result: 'The portal runs inside the existing site with no extra server, and every contract keeps its history.',
    },
    pt: {
      title: 'Um portal de RH que mora dentro do site da empresa',
      summary: 'Plugins WordPress próprios para onboarding, pedidos e contratos com assinatura eletrônica.',
      problem: 'Contratos de prestadores e onboarding eram feitos à mão, em documentos soltos e sem histórico.',
      did: [
        'Escrevi plugins WordPress para acessos, pedidos e trilha de auditoria.',
        'Enviei os contratos preenchidos para assinatura eletrônica.',
        'Testei cada versão localmente antes de ir ao ar.',
      ],
      result: 'O portal roda dentro do site que já existia, sem servidor extra, e cada contrato guarda o seu histórico.',
    },
  },
  {
    id: 'light-crm', tag: 'automation',
    tools: ['Google Apps Script', 'GoHighLevel API', 'JavaScript'],
    en: {
      title: 'A spreadsheet CRM for a small sales team',
      summary: 'A Google Apps Script web app for pipeline, meetings and commissions, covered by automated tests.',
      problem: 'A small sales team ran its pipeline in spreadsheets and uploaded contact lists to the marketing platform by hand.',
      did: [
        'Built a web app with pipeline, meetings and commissions, one spreadsheet per person.',
        'Added a screen that sends spreadsheets to the marketing platform in batches, inside the API limits.',
        'Covered the rules, metrics and uploads with automated tests.',
      ],
      result: 'Each person keeps their own spreadsheet, and list uploads happen from one screen.',
    },
    pt: {
      title: 'Um CRM em planilha para uma equipe comercial pequena',
      summary: 'Um web app em Google Apps Script com funil, reuniões e comissões, coberto por testes automatizados.',
      problem: 'Uma equipe comercial pequena controlava o funil em planilhas e subia listas de contatos na mão para a plataforma de marketing.',
      did: [
        'Construí um web app com funil, reuniões e comissões, uma planilha por pessoa.',
        'Criei uma tela que envia planilhas para a plataforma de marketing em lotes, dentro dos limites da API.',
        'Cobri regras, métricas e envios com testes automatizados.',
      ],
      result: 'Cada pessoa mantém a própria planilha, e o envio de listas sai de uma tela só.',
    },
  },
  {
    id: 'email-verifier', tag: 'email',
    tools: ['Go', 'Desktop app', 'DNS lookups'],
    en: {
      title: 'A desktop tool for checking large email lists',
      summary: 'Checks big lists on the computer itself, so the data never leaves it.',
      problem: 'Bad addresses were hurting deliverability, and the lists were too large and too sensitive for web services.',
      did: [
        'Wrote a desktop app in Go that checks addresses in bulk, locally.',
        'Added counts, a review screen, blocking of bad entries and suggestions for common typos.',
        'Gave it a simple, friendly interface anyone on the team can use.',
      ],
      result: 'A single file anyone can run, with no data leaving the computer.',
    },
    pt: {
      title: 'Uma ferramenta de desktop para conferir listas grandes de e-mail',
      summary: 'Confere listas grandes no próprio computador, sem os dados saírem dele.',
      problem: 'Endereços ruins prejudicavam a entrega, e as listas eram grandes e sensíveis demais para serviços web.',
      did: [
        'Escrevi um app de desktop em Go que confere endereços em massa, localmente.',
        'Coloquei contagens, tela de revisão, bloqueio de entradas ruins e sugestão para erros de digitação comuns.',
        'Dei a ele uma interface simples e amigável, para qualquer pessoa do time usar.',
      ],
      result: 'Um arquivo único que qualquer pessoa roda, sem nenhum dado sair do computador.',
    },
  },
  {
    id: 'company-sites', tag: 'web',
    tools: ['HTML and CSS', 'WordPress plugins', 'PHP'],
    en: {
      title: 'Websites for companies outside insurance',
      summary: 'An investment firm and a technology company, each with a site built for its own business.',
      problem: 'Each needed a site that explained the business clearly, and one needed a safe way to receive contact requests.',
      did: [
        'Built a bilingual site for the investment firm.',
        'Redesigned its WordPress site with a plugin whose contact form feeds a private, login-protected dashboard.',
        'Built a dark, glass-styled site with team photos for the technology company.',
      ],
      result: 'The sites are live on their own domains.',
    },
    pt: {
      title: 'Sites para empresas fora do mercado de seguros',
      summary: 'Uma empresa de investimentos e uma de tecnologia, cada uma com um site feito para o seu negócio.',
      problem: 'Cada uma precisava de um site que explicasse o negócio com clareza, e uma delas de um jeito seguro de receber pedidos de contato.',
      did: [
        'Construí um site bilíngue para a empresa de investimentos.',
        'Redesenhei o WordPress dela com um plugin cujo formulário alimenta um painel privado, com login.',
        'Construí um site escuro, com efeito de vidro e fotos da equipe, para a empresa de tecnologia.',
      ],
      result: 'Os sites estão no ar, cada um no seu domínio.',
    },
  },
  {
    id: 'docs-manuals', tag: 'ai',
    tools: ['Python', 'PDF generation', 'Markdown knowledge bases'],
    en: {
      title: 'Documentation people, and AI assistants, can learn from',
      summary: 'An illustrated manual for a marketing platform, and knowledge packs that brief other AI assistants.',
      problem: 'Knowledge about the tools lived in people’s heads, and every new AI assistant started from zero.',
      did: [
        'Wrote an illustrated manual in the brand’s colours covering every module, with a catalog of triggers and actions.',
        'Packaged brand, tone and compliance rules as knowledge bases other assistants can load.',
        'Generated the PDF from source, so an update is one rebuild.',
      ],
      result: 'One reference for people and one for machines, both kept in step with how the work is really done.',
    },
    pt: {
      title: 'Documentação com que pessoas, e assistentes de IA, aprendem',
      summary: 'Um manual ilustrado de uma plataforma de marketing e pacotes de conhecimento que orientam outros assistentes de IA.',
      problem: 'O conhecimento sobre as ferramentas ficava na cabeça das pessoas, e cada assistente de IA novo começava do zero.',
      did: [
        'Escrevi um manual ilustrado nas cores da marca, cobrindo todos os módulos, com catálogo de gatilhos e ações.',
        'Empacotei regras de marca, tom e compliance como bases de conhecimento que outros assistentes carregam.',
        'Gerei o PDF a partir do código-fonte, e cada atualização é só gerar de novo.',
      ],
      result: 'Uma referência para pessoas e outra para máquinas, as duas alinhadas com o jeito real de trabalhar.',
    },
  },
];

/* ===== Interface text per language ====================================== */
export const LANGS = {
  en: {
    htmlLang: 'en',
    path: '/',
    title: 'Igor Cruz, marketing operations, CRM and automation',
    description: 'Portfolio of Igor Henrique de Oliveira Cruz: case studies in CRM, automation, websites, data and applied AI for marketing teams.',
    skip: 'Skip to content',
    nav: { label: 'Sections', work: 'Work', process: 'Process', toolbox: 'Toolbox', contact: 'Contact' },
    langSwitch: { label: 'Language', otherName: 'Português' },
    theme: { label: 'Light theme' },
    hero: {
      kicker: 'Marketing operations, CRM and automation',
      name: 'Igor Cruz',
      line: 'I connect the landing page to the sales team.',
      intro: [
        'I build the pages and the forms, make sure every lead reaches the CRM with its source intact, keep the emails out of spam and measure what is really working.',
        'Right now I do this for a US insurance agency that serves Brazilian and Hispanic families. The cases below are real and contain no client data.',
      ],
      ctaEmail: 'Email me',
      ctaCopy: 'Copy address',
      ctaCopied: 'Copied',
      ctaWork: 'See the work',
      ctaCv: 'Download CV',
      cvFile: 'assets/cv/Igor_Cruz_CV_EN.pdf',
      linkedin: 'LinkedIn profile',
      pause: 'Pause animation',
      play: 'Play animation',
      flowLabel: 'How it works',
      facts: [
        ['Based in', 'Jundiaí, Brazil'],
        ['Languages', 'English, Portuguese, Spanish'],
        ['Works in', 'US and Brazilian markets'],
      ],
    },
    console: {
      label: 'How a lead travels through the work I do',
      nodes: ['Pages', 'Ads and forms', 'CRM', 'Sales team'],
      notes: ['60+ pages, 3 languages', 'Meta, TikTok, site forms', 'Routed, deduplicated', '130k emails a week'],
      hud: [
        'A visitor lands on a page',
        'The form keeps the source and UTMs',
        'The CRM gets one clean record',
        'Sales gets the lead with its history',
      ],
      hudTitle: 'Lead route',
    },
    gauges: {
      title: 'The work in numbers',
      items: [
        ['14,000', 'emails a day from one warmed-up domain'],
        ['60+', 'pages migrated to WordPress'],
        ['130k', 'follow-up emails a week'],
        ['12,034', 'leads brought into the CRM'],
        ['81', 'ad data columns collected daily'],
        ['80+', 'automated tests in one app'],
      ],
    },
    capabilities: {
      title: 'What I do',
      lede: 'Four kinds of work, usually all in the same week.',
      items: [
        ['Automation and CRM', ['n8n and Zapier flows with alerts', 'Deduplication and field standards', 'WhatsApp, SMS and email journeys']],
        ['Websites and landing pages', ['WordPress, Elementor and custom plugins', 'Sites in three languages', 'Forms that keep their source']],
        ['Data and tracking', ['Tag Manager, pixels and conversion events', 'Ad platform APIs', 'Dashboards people trust']],
        ['AI operations', ['Agents with human approval', 'Knowledge bases for brand and tools', 'Checks on every delivery']],
      ],
    },
    work: {
      title: 'Selected work',
      lede: 'Problems I was handed and what happened after. The first three are told in full; the rest are short summaries you can open.',
      featuredLabel: 'In depth',
      moreTitle: 'More work',
      filterLabel: 'Filter the cases',
      showing: (n, total) => `Showing ${n} of ${total}`,
      parts: { problem: 'The problem', did: 'What I did', result: 'What changed', role: 'My role', tools: 'Tools' },
      open: 'Open case',
      close: 'Close case',
      status: { live: 'Live', progress: 'In progress', delivered: 'Delivered', personal: 'Personal project' },
    },
    filters: [
      ['all', 'All'], ['automation', 'Automation'], ['web', 'Websites'], ['data', 'Data'],
      ['email', 'Email'], ['ai', 'AI'],
    ],
    process: {
      title: 'How a project goes',
      lede: 'The same six steps, whether it is a form or a whole system.',
      steps: [
        ['Listen', 'What do people need, and which data is missing?'],
        ['Map the data', 'Where each field comes from and where it has to arrive.'],
        ['Build beside production', 'New work runs next to what already works, never on top of it.'],
        ['Test', 'Real cases, edge cases, and the failure path.'],
        ['Ship with checks', 'Concrete completion checks, written before the work starts.'],
        ['Measure', 'If it cannot be measured, it is not finished.'],
      ],
    },
    toolbox: {
      title: 'Toolbox',
      lede: 'What I reach for most days. I pick the tool once I understand the problem.',
      groups: [
        ['Automation and CRM', ['n8n', 'Zapier', 'Zoho CRM', 'Zoho Sign', 'GoHighLevel', 'Google Apps Script']],
        ['Websites', ['WordPress', 'Elementor', 'HTML and CSS', 'JavaScript', 'PHP']],
        ['Ads and data', ['Meta Ads', 'TikTok Ads API', 'Google Tag Manager', 'Zoho Analytics', 'Postgres']],
        ['Email and messaging', ['Zoho Marketing Automation', 'SPF, DKIM and DMARC', 'Twilio', 'WhatsApp gateways']],
        ['AI and code', ['Claude and Claude Code', 'MCP connectors', 'Python', 'Go', 'Node.js', 'Git']],
      ],
    },
    principles: {
      title: 'What I hold to',
      items: [
        ['Understand the need first', 'I start from what people need and which data is missing. The tool comes after.'],
        ['Don’t break what works', 'Big changes go in next to production, with a backup and a way back.'],
        ['Done means checked', 'Every delivery has concrete completion checks and only counts once it is tested.'],
        ['Client data stays protected', 'No personal data in code or reports, the least access an integration needs, and approval before acting.'],
      ],
    },
    contact: {
      title: 'Need someone who can build it and keep it running?',
      text: 'Tell me what is breaking or what you need built, and I will tell you how I would approach it.',
      github: 'GitHub profile',
    },
    footer: 'Cases shared without client data. Product names and logos are trademarks of their owners. Last updated November 2026.',
  },

  pt: {
    htmlLang: 'pt-BR',
    path: '/pt/',
    title: 'Igor Cruz, operações de marketing, CRM e automação',
    description: 'Portfólio de Igor Henrique de Oliveira Cruz: casos em CRM, automação, sites, dados e IA aplicada para times de marketing.',
    skip: 'Pular para o conteúdo',
    nav: { label: 'Seções', work: 'Trabalhos', process: 'Processo', toolbox: 'Ferramentas', contact: 'Contato' },
    langSwitch: { label: 'Idioma', otherName: 'English' },
    theme: { label: 'Tema claro' },
    hero: {
      kicker: 'Operações de marketing, CRM e automação',
      name: 'Igor Cruz',
      line: 'Eu conecto a página de captação ao time de vendas.',
      intro: [
        'Construo as páginas e os formulários, garanto que cada lead chegue ao CRM com a origem certa, mantenho os e-mails longe do spam e meço o que de fato funciona.',
        'Hoje faço isso numa corretora de seguros nos EUA que atende famílias brasileiras e hispânicas. Os casos abaixo são reais e não têm dados de clientes.',
      ],
      ctaEmail: 'Mandar e-mail',
      ctaCopy: 'Copiar endereço',
      ctaCopied: 'Copiado',
      ctaWork: 'Ver os trabalhos',
      ctaCv: 'Baixar currículo',
      cvFile: 'assets/cv/Igor_Cruz_Curriculo_PT.pdf',
      linkedin: 'Perfil no LinkedIn',
      pause: 'Pausar animação',
      play: 'Retomar animação',
      flowLabel: 'Como funciona',
      facts: [
        ['Moro em', 'Jundiaí, SP'],
        ['Idiomas', 'Inglês, português, espanhol'],
        ['Atuo nos', 'mercados dos EUA e do Brasil'],
      ],
    },
    console: {
      label: 'O caminho de um lead pelo trabalho que eu faço',
      nodes: ['Páginas', 'Anúncios e forms', 'CRM', 'Time de vendas'],
      notes: ['60+ páginas, 3 idiomas', 'Meta, TikTok, forms do site', 'Roteado, sem duplicados', '130 mil e-mails/semana'],
      hud: [
        'Um visitante chega na página',
        'O formulário guarda origem e UTMs',
        'O CRM recebe um registro limpo',
        'Vendas recebe o lead com o histórico',
      ],
      hudTitle: 'Rota do lead',
    },
    gauges: {
      title: 'O trabalho em números',
      items: [
        ['14 mil', 'e-mails por dia num domínio aquecido'],
        ['60+', 'páginas migradas para o WordPress'],
        ['130 mil', 'e-mails de acompanhamento por semana'],
        ['12.034', 'leads trazidos para o CRM'],
        ['81', 'colunas de dados de anúncio por dia'],
        ['80+', 'testes automatizados num app'],
      ],
    },
    capabilities: {
      title: 'O que eu faço',
      lede: 'Quatro tipos de trabalho, quase sempre na mesma semana.',
      items: [
        ['Automação e CRM', ['Fluxos no n8n e Zapier com alerta', 'Deduplicação e padrão de campos', 'Jornadas de WhatsApp, SMS e e-mail']],
        ['Sites e páginas de captação', ['WordPress, Elementor e plugins próprios', 'Sites em três idiomas', 'Formulários que guardam a origem']],
        ['Dados e mensuração', ['Tag Manager, pixels e eventos de conversão', 'APIs das plataformas de anúncio', 'Painéis em que as pessoas confiam']],
        ['Operação com IA', ['Agentes com aprovação humana', 'Bases de conhecimento de marca e ferramentas', 'Checagem em toda entrega']],
      ],
    },
    work: {
      title: 'Trabalhos',
      lede: 'Problemas que recebi e o que aconteceu depois. Os três primeiros estão contados por inteiro; os demais são resumos curtos que você pode abrir.',
      featuredLabel: 'Em detalhe',
      moreTitle: 'Mais trabalhos',
      filterLabel: 'Filtrar os casos',
      showing: (n, total) => `Mostrando ${n} de ${total}`,
      parts: { problem: 'O problema', did: 'O que eu fiz', result: 'O que mudou', role: 'Meu papel', tools: 'Ferramentas' },
      open: 'Abrir caso',
      close: 'Fechar caso',
      status: { live: 'No ar', progress: 'Em andamento', delivered: 'Entregue', personal: 'Projeto pessoal' },
    },
    filters: [
      ['all', 'Todos'], ['automation', 'Automação'], ['web', 'Sites'], ['data', 'Dados'],
      ['email', 'E-mail'], ['ai', 'IA'],
    ],
    process: {
      title: 'Como um projeto anda',
      lede: 'Os mesmos seis passos, seja um formulário ou um sistema inteiro.',
      steps: [
        ['Ouvir', 'Do que as pessoas precisam, e que dado está faltando?'],
        ['Mapear os dados', 'De onde vem cada campo e aonde ele precisa chegar.'],
        ['Construir ao lado', 'O novo roda junto do que já funciona, nunca por cima.'],
        ['Testar', 'Casos reais, casos extremos e o caminho da falha.'],
        ['Entregar com checagem', 'Critérios concretos de conclusão, escritos antes de começar.'],
        ['Medir', 'Se não dá para medir, não terminou.'],
      ],
    },
    toolbox: {
      title: 'Ferramentas',
      lede: 'O que eu uso quase todo dia. Escolho a ferramenta depois de entender o problema.',
      groups: [
        ['Automação e CRM', ['n8n', 'Zapier', 'Zoho CRM', 'Zoho Sign', 'GoHighLevel', 'Google Apps Script']],
        ['Sites', ['WordPress', 'Elementor', 'HTML e CSS', 'JavaScript', 'PHP']],
        ['Anúncios e dados', ['Meta Ads', 'TikTok Ads API', 'Google Tag Manager', 'Zoho Analytics', 'Postgres']],
        ['E-mail e mensagens', ['Zoho Marketing Automation', 'SPF, DKIM e DMARC', 'Twilio', 'Gateways de WhatsApp']],
        ['IA e código', ['Claude e Claude Code', 'Conectores MCP', 'Python', 'Go', 'Node.js', 'Git']],
      ],
    },
    principles: {
      title: 'Do que eu não abro mão',
      items: [
        ['Entender antes de escolher', 'Começo pelo que as pessoas precisam e pelo dado que falta. A ferramenta vem depois.'],
        ['Não quebrar o que funciona', 'Mudança grande entra ao lado da produção, com backup e caminho de volta.'],
        ['Pronto é o que foi checado', 'Toda entrega tem critérios concretos de conclusão e só conta depois de testada.'],
        ['Dado de cliente protegido', 'Nada de dado pessoal em código ou relatório, o mínimo de acesso nas integrações e aprovação antes de agir.'],
      ],
    },
    contact: {
      title: 'Precisa de alguém que construa e mantenha rodando?',
      text: 'Me conte o que está quebrando ou o que precisa ser construído, e eu conto como atacaria o problema.',
      github: 'Perfil no GitHub',
    },
    footer: 'Casos compartilhados sem dados de clientes. Nomes e logos de produtos são marcas dos seus donos. Atualizado em novembro de 2026.',
  },
};

/** Returns the cases with one language merged in (metric label included). */
export function casesFor(lang) {
  return CASES.map(({ en, pt, metric, ...meta }) => ({
    ...meta,
    ...(lang === 'pt' ? pt : en),
    metric: metric ? { value: metric.value, label: metric[lang] } : null,
    flow: FLOWS[meta.id] ? { gate: FLOWS[meta.id].gate, stages: FLOWS[meta.id][lang] } : null,
  }));
}
