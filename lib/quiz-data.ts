export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  section: string
}

export interface QuizSection {
  id: string
  name: string
  title: string
  description: string
  icon: string
  color: string
  questionCount: number
  info: {
    headline: string
    description: string
  }
}

// Quiz Sections with Info
export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: "arcium",
    name: "What is Arcium",
    title: "Understanding Arcium",
    description: "The encrypted supercomputer foundation",
    icon: "🔷",
    color: "from-blue-500 to-purple-600",
    questionCount: 5,
    info: {
      headline: "Arcium: The Encrypted Supercomputer",
      description:
        "Arcium is a revolutionary encrypted supercomputer that provides fast, flexible, and low-cost infrastructure for accessing encrypted computation via blockchain. Using secure Multi-Party Computation (MPC), Arcium delivers scalable encryption solutions that enable trustless, verifiable, and efficient computation over fully encrypted data. The network consists of decentralized Arx nodes performing secure multi-party computation, eliminating the need for centralized entities while allowing calculations on encrypted data without exposure. Core components include Multi-Party Execution Environments (MXEs) for dedicated computation spaces, arxOS as the distributed execution engine, Arcis as the Rust-based developer framework, and Solana integration for chain-level enforcement and orchestration. Arcium's parallel execution model allows independent tasks to run simultaneously, with each MXE maintaining its own state for maximum throughput. The technology serves industries like AI, DeFi, and DePIN, enabling entirely new use cases where data security is paramount—from collaborative fraud detection in finance to protected intellectual property in machine learning.",
    },
  },
  {
    id: "umbra",
    name: "Umbra",
    title: "Umbra: Privacy Protocol",
    description: "Solana-based privacy with Arcium's power",
    icon: "🔐",
    color: "from-cyan-500 to-blue-600",
    questionCount: 5,
    info: {
      headline: "Umbra: Private Transactions on Solana",
      description:
        "Umbra represents a groundbreaking shift in how transactions can be conducted on the Solana blockchain. Built specifically to leverage Arcium's Multi-Party Computation network, Umbra enables users to execute transactions with complete privacy while maintaining the transparency needed for compliance. At its core, Umbra encrypts transaction data, making it unlinkable—meaning observers cannot connect transactions to specific addresses or patterns. The protocol settles transactions on-chain while keeping all sensitive details confidential. This unique combination of privacy and auditability addresses a critical gap in the DeFi ecosystem, where traders need protection from surveillance without sacrificing regulatory compliance. Umbra is poised to launch alongside Arcium's Mainnet Alpha, bringing institutional-grade privacy to everyday Solana users and enabling a new class of confidential financial applications.",
    },
  },
  {
    id: "darkpools",
    name: "Dark Pools",
    title: "Dark Pools & Confidential DeFi",
    description: "Private trading execution",
    icon: "🌊",
    color: "from-purple-500 to-pink-600",
    questionCount: 5,
    info: {
      headline: "Dark Pools: Protected Trading Venues",
      description:
        "Dark pools in decentralized finance represent a paradigm shift in how large trades are executed and settled. Traditionally, transparent order books expose every trade to the network, enabling sophisticated attackers to manipulate prices through front-running, sandwich attacks, and MEV extraction. Dark pools solve this by moving order execution into a confidential environment where trades remain hidden until completion. This strategic privacy prevents copy-traders from mimicking positions, protects sensitive trading strategies from competitors, and shields participants from predatory trading algorithms. Projects like Darklake are pioneering this space by partnering with Arcium to deliver end-to-end encrypted trading. The result is a protected venue where institutional and retail traders can execute large positions without market impact or malicious extraction. Dark pools are essential infrastructure for serious DeFi participants who cannot tolerate transparent execution and represent the future of competitive markets.",
    },
  },
  {
    id: "architecture",
    name: "Arcium Architecture",
    title: "Arcium's Encrypted Supercomputer",
    description: "Network design and core infrastructure",
    icon: "⚙️",
    color: "from-indigo-500 to-purple-600",
    questionCount: 5,
    info: {
      headline: "Arcium Architecture: The Encrypted Supercomputer",
      description:
        "Arcium's architecture represents a fundamental reimagining of how decentralized computation can be performed securely. At the foundation are Arx Nodes—specialized network participants that stake collateral to participate in computation and are economically penalized for misbehavior. These nodes don't simply execute code; they participate in sophisticated Multi-Party Computation protocols where computation happens on encrypted data, and no single node ever has access to unencrypted inputs. Computations occur within MXEs (Multiparty eXecution Environments), which are dynamic virtual spaces where computation customers define their security parameters. The network supports a revolutionary parallel execution model where multiple independent computations run simultaneously with complete isolation, unlocking unprecedented throughput. Data protection relies on secret sharing—sensitive information is split into cryptographic shares distributed across Arx Nodes, requiring a minimum threshold to reconstruct. The Cerberus protocol adds an additional layer of defense against side-channel attacks. This architecture transforms blockchain from a transparent-by-default system into a programmable encrypted supercomputer where privacy and computation coexist.",
    },
  },
  {
    id: "pets",
    name: "Privacy-Enhancing Tech",
    title: "PETs & Confidential Computing",
    description: "Cryptographic foundations",
    icon: "🔒",
    color: "from-emerald-500 to-teal-600",
    questionCount: 5,
    info: {
      headline: "Privacy-Enhancing Technologies (PETs)",
      description:
        "Privacy-Enhancing Technologies (PETs) form the cryptographic bedrock enabling modern confidential computing. Unlike traditional privacy approaches that rely on obscurity, PETs use advanced mathematics to prove security guarantees. Multi-Party Computation (MPC) allows multiple distrusting parties to jointly compute a result without revealing their individual inputs—imagine calculating an average salary across a company without anyone seeing anyone else's compensation. Homomorphic encryption takes this further, enabling computation directly on encrypted data; results are encrypted and only decryptable by authorized parties. Zero-Knowledge Proofs represent another pillar: you can prove you possess certain knowledge or satisfy certain conditions without revealing the information itself—crucial for compliance without sacrificing privacy. These technologies work together in systems like Arcium to create environments where data remains encrypted throughout its lifecycle while still being useful for computation, analysis, and business logic. Understanding PETs is essential for grasping how confidential computing can deliver on the promise of data utility without privacy compromise.",
    },
  },
  {
    id: "applications",
    name: "Applications",
    title: "Real-World Use Cases",
    description: "Gaming, AI, DePIN, and beyond",
    icon: "🚀",
    color: "from-amber-500 to-orange-600",
    questionCount: 5,
    info: {
      headline: "Arcium Applications: Changing Industries",
      description:
        "Arcium's applications span a wide range of industries, transforming how data is handled and processed while maintaining privacy. In gaming, Arcium protects in-game assets, user wallets, and player profiles from unauthorized access, ensuring a secure environment without compromising game integrity. For AI and machine learning, Arcium enables training on encrypted enterprise data, allowing companies to analyze sensitive information securely and without exposing it to untrusted parties. DePIN, or Decentralized Physical Infrastructure Networks, uses Arcium's privacy capabilities to protect critical infrastructure data, ensuring that network status and device information remain confidential. In healthcare, Arcium facilitates privacy-preserving medical research, allowing scientists to collaborate on data without revealing individual patient information. These applications demonstrate Arcium's versatility in creating secure, private environments for various use cases, from gaming and AI to infrastructure and medical research.",
    },
  },
]

const QUESTIONS_BY_SECTION: Record<string, Question[]> = {
  arcium: [
    {
      id: 1,
      question: "What is Arcium primarily designed for?",
      options: [
        "Creating NFT marketplaces",
        "Fast, flexible encrypted computation via blockchain using Multi-Party Computation",
        "Mining cryptocurrency",
        "Social media integration",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 2,
      question: "What is arxOS in the Arcium ecosystem?",
      options: [
        "A mobile operating system",
        "The distributed execution engine coordinating computations and powering Arx Nodes",
        "A web browser extension",
        "A token staking platform",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 3,
      question: "Which blockchain does Arcium integrate with for chain-level enforcement and orchestration?",
      options: ["Ethereum", "Bitcoin", "Solana", "Cardano"],
      correctAnswer: 2,
      section: "arcium",
    },
    {
      id: 4,
      question: "What key benefit does Arcium provide for AI and machine learning applications?",
      options: [
        "Faster GPU processing",
        "Training on encrypted enterprise data without exposing sensitive information",
        "Lower electricity costs",
        "Automatic model optimization",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 5,
      question: "What are MXEs in Arcium's architecture?",
      options: [
        "Multi-Party eXecution Environments - dedicated spaces for secure computation",
        "Marketing eXchange Engines",
        "Mobile eXperience Extensions",
        "Mining eXtraction Equipment",
      ],
      correctAnswer: 0,
      section: "arcium",
    },
  ],
  umbra: [
    {
      id: 101,
      question: "What blockchain is Umbra primarily built on?",
      options: ["Ethereum", "Polygon", "Solana", "Bitcoin"],
      correctAnswer: 2,
      section: "umbra",
    },
    {
      id: 102,
      question: "What is Umbra's primary function in the Arcium ecosystem?",
      options: [
        "A token staking platform",
        "A Solana-based privacy protocol using Arcium's MPC network for encrypted transactions",
        "A blockchain explorer",
        "A mining pool manager",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 103,
      question: "Which of these is a key feature of Umbra transactions?",
      options: [
        "Public visibility of all trade amounts",
        "Encrypted, unlinkable, and auditable transactions",
        "Centralized order matching",
        "Higher transaction costs for privacy",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 104,
      question: "When is Umbra planned to launch?",
      options: ["It's already live", "Next quarter", "Alongside Arcium's Mainnet Alpha", "Unknown timeline"],
      correctAnswer: 2,
      section: "umbra",
    },
    {
      id: 105,
      question: "What does 'unlinkable' mean in the context of Umbra transactions?",
      options: [
        "Transactions cannot be verified",
        "Transactions cannot be linked to the user's identity or previous transactions",
        "Transactions are impossible to audit",
        "Transactions cannot be processed",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
  ],
  darkpools: [
    {
      id: 201,
      question: "What is the primary benefit of on-chain dark pools?",
      options: [
        "Increased transaction fees",
        "Confidential order execution protecting traders from MEV, front-running, and sandwich attacks",
        "Lower block space usage",
        "Immediate price transparency",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 202,
      question: "How do dark pools in Arcium move trade execution?",
      options: [
        "Through public mempool broadcasting",
        "Off public ledgers into a confidential environment where orders remain private until completion",
        "Via traditional centralized exchanges only",
        "Through Layer 1 validators exclusively",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 203,
      question: "What attack vector do dark pools primarily protect against?",
      options: [
        "DDoS attacks",
        "Front-running, sandwich attacks, and MEV extraction",
        "Phishing scams",
        "SQL injection",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 204,
      question: "Which project is mentioned as partnering with Arcium for encrypted DeFi?",
      options: ["Uniswap", "SushiSwap", "Darklake", "PancakeSwap"],
      correctAnswer: 2,
      section: "darkpools",
    },
    {
      id: 205,
      question: "What is 'strategic privacy' in dark pools?",
      options: [
        "Privacy for marketing strategies",
        "Hiding trading histories and balances to prevent copy-trading and discrimination",
        "Privacy for wallet addresses only",
        "Temporary privacy that expires after settlement",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
  ],
  architecture: [
    {
      id: 301,
      question: "What are Arx Nodes in the Arcium network?",
      options: [
        "Storage devices for blockchain data",
        "Decentralized network participants staking collateral to perform secure computation",
        "Mining hardware for proof-of-work",
        "API endpoints for developers",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 302,
      question: "What does MXE stand for in Arcium?",
      options: [
        "Multi-eXecution Environment",
        "Multiparty eXecution Environment",
        "Managed eXternal Environment",
        "Mining eXchange Engine",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 303,
      question: "What security technique does Arcium use to protect data across Arx Nodes?",
      options: [
        "Single-key encryption",
        "Secret sharing - splitting data into cryptographic shares requiring threshold to reconstruct",
        "Plaintext storage with access logs",
        "Centralized database encryption",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 304,
      question: "What is the Cerberus protocol's purpose in Arcium?",
      options: [
        "Token distribution mechanism",
        "Node discovery protocol",
        "Enhanced protection against side-channel attacks using computational security",
        "Smart contract compiler",
      ],
      correctAnswer: 2,
      section: "architecture",
    },
    {
      id: 305,
      question: "How does Arcium achieve high throughput?",
      options: [
        "By limiting the number of users",
        "Through parallel execution where multiple independent computations run simultaneously",
        "By reducing security parameters",
        "By centralizing computation",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
  ],
  pets: [
    {
      id: 401,
      question: "What does PETs stand for?",
      options: [
        "Public Encryption Technology Systems",
        "Privacy-Enhancing Technologies",
        "Protected Entry Token Standards",
        "Parallel Execution Transaction Systems",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 402,
      question: "What does Multi-Party Computation (MPC) allow?",
      options: [
        "Multiple users to share passwords",
        "Multiple parties to jointly compute results without revealing individual inputs",
        "Multiple blockchains to merge",
        "Multiple tokens to be swapped",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 403,
      question: "What is unique about homomorphic encryption?",
      options: [
        "It encrypts data twice for extra security",
        "It enables computation directly on encrypted data without decryption",
        "It only works with numbers",
        "It requires quantum computers",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 404,
      question: "What do Zero-Knowledge Proofs (ZKP) enable?",
      options: [
        "Proving possession of knowledge without revealing the information itself",
        "Removing all encryption from transactions",
        "Faster transaction processing",
        "Lower gas fees",
      ],
      correctAnswer: 0,
      section: "pets",
    },
    {
      id: 405,
      question: "Why are PETs considered superior to traditional privacy approaches?",
      options: [
        "They are faster",
        "They are cheaper",
        "They use advanced mathematics to prove security guarantees instead of relying on obscurity",
        "They don't require any computing power",
      ],
      correctAnswer: 2,
      section: "pets",
    },
  ],
  applications: [
    {
      id: 501,
      question: "How does Arcium benefit gaming applications?",
      options: [
        "By increasing game frame rates",
        "By protecting in-game assets, wallets, and player profiles from unauthorized access",
        "By reducing game file sizes",
        "By providing free game hosting",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 502,
      question: "What does DePIN stand for in Arcium's use cases?",
      options: [
        "Decentralized Payment Infrastructure Network",
        "Digital Enterprise Privacy Integration",
        "Decentralized Physical Infrastructure Networks",
        "Distributed Encryption Protocol Interface",
      ],
      correctAnswer: 2,
      section: "applications",
    },
    {
      id: 503,
      question: "How does Arcium transform healthcare applications?",
      options: [
        "By replacing doctors with AI",
        "By enabling privacy-preserving medical research and collaboration without revealing patient data",
        "By storing all medical records on public blockchains",
        "By reducing hospital operating costs",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 504,
      question: "What AI/ML capability does Arcium uniquely enable?",
      options: [
        "Faster neural network training",
        "Training machine learning models on encrypted enterprise data securely",
        "Automatic code generation",
        "Image recognition without GPUs",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 505,
      question: "In financial use cases, what does Arcium enable institutions to do?",
      options: [
        "Eliminate all transaction fees",
        "Collaborate on fraud detection without losing control of their data",
        "Share customer information publicly",
        "Bypass regulatory requirements",
      ],
      correctAnswer: 1,
      section: "applications",
    },
  ],
}

export function getQuestionsBySection(sectionId: string, excludeIds: number[] = []): Question[] {
  const questions = QUESTIONS_BY_SECTION[sectionId] || []
  const filtered = questions.filter((q) => !excludeIds.includes(q.id))

  return filtered.sort(() => 0.5 - Math.random())
}

export function randomizeQuestionOptions(question: Question): Question {
  const options = [...question.options]
  const correctOptionText = options[question.correctAnswer]

  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[options[i], options[j]] = [options[j], options[i]]
  }

  const newCorrectAnswer = options.indexOf(correctOptionText)

  return {
    ...question,
    options,
    correctAnswer: newCorrectAnswer,
  }
}
