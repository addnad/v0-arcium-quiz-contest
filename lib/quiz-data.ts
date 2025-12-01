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
    details: string[]
  }
}

// Quiz Sections with Info
export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: "umbra",
    name: "Umbra",
    title: "Umbra: Privacy Protocol",
    description: "Solana-based privacy with Arcium's power",
    icon: "🔐",
    color: "from-cyan-500 to-blue-600",
    questionCount: 7,
    info: {
      headline: "Umbra: Private Transactions on Solana",
      details: [
        "Umbra is a Solana-based privacy protocol that leverages Arcium's Multi-Party Computation network",
        "It enables encrypted, unlinkable transactions that maintain full auditability for compliance",
        "Transaction data remains confidential while settlement happens on-chain",
        "Built to launch alongside Arcium's Mainnet Alpha for seamless integration",
      ],
    },
  },
  {
    id: "darkpools",
    name: "Dark Pools",
    title: "Dark Pools & Confidential DeFi",
    description: "Private trading execution",
    icon: "🌊",
    color: "from-purple-500 to-pink-600",
    questionCount: 7,
    info: {
      headline: "Dark Pools: Protected Trading Venues",
      details: [
        "Dark pools enable confidential order execution without exposing trade details to predators",
        "Protection from MEV (Maximal Extractable Value), front-running, and sandwich attacks",
        "Orders remain private until settlement, preventing market manipulation",
        "Projects like Darklake partner with Arcium for end-to-end encrypted DeFi",
      ],
    },
  },
  {
    id: "architecture",
    name: "Arcium Architecture",
    title: "Arcium's Encrypted Supercomputer",
    description: "Network design and core infrastructure",
    icon: "⚙️",
    color: "from-indigo-500 to-purple-600",
    questionCount: 7,
    info: {
      headline: "Arcium Architecture: The Encrypted Supercomputer",
      details: [
        "Arx Nodes: Decentralized compute points requiring staking with penalties for misbehavior",
        "MXEs (Multiparty eXecution Environments): Virtual, encrypted spaces for secure computation",
        "Parallel execution model enables multiple independent computations simultaneously",
        "Secret sharing distributes data across nodes—no single point has full access",
      ],
    },
  },
  {
    id: "pets",
    name: "Privacy-Enhancing Tech",
    title: "PETs & Confidential Computing",
    description: "Cryptographic foundations",
    icon: "🔒",
    color: "from-emerald-500 to-teal-600",
    questionCount: 7,
    info: {
      headline: "Privacy-Enhancing Technologies (PETs)",
      details: [
        "PETs are tools enabling data analysis without exposing personal or proprietary information",
        "Multi-Party Computation (MPC) allows multiple parties to jointly compute while keeping inputs private",
        "Homomorphic encryption enables computation directly on encrypted data",
        "Zero-Knowledge Proofs verify statements without revealing the underlying information",
      ],
    },
  },
  {
    id: "applications",
    name: "Applications",
    title: "Real-World Use Cases",
    description: "Gaming, AI, DePIN, and beyond",
    icon: "🚀",
    color: "from-amber-500 to-orange-600",
    questionCount: 7,
    info: {
      headline: "Arcium Applications: Changing Industries",
      details: [
        "Gaming: Protect in-game assets and player data while maintaining game integrity",
        "AI/ML: Train models on encrypted enterprise data without exposing sensitive information",
        "DePIN: Decentralized Physical Infrastructure Networks with privacy protection",
        "Healthcare: Privacy-preserving medical research without revealing individual data",
      ],
    },
  },
]

const QUESTIONS_BY_SECTION: Record<string, Question[]> = {
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
    {
      id: 106,
      question: "How does Umbra maintain compliance while providing privacy?",
      options: [
        "It doesn't - privacy and compliance are mutually exclusive",
        "Through full auditability of transactions despite being encrypted",
        "By storing user data on centralized servers",
        "It shares data with regulatory authorities",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 107,
      question: "What is the relationship between Umbra and Arcium?",
      options: [
        "They are competitors",
        "Umbra is a separate unrelated project",
        "Umbra leverages Arcium's MPC network for its privacy capabilities",
        "Arcium is built on top of Umbra",
      ],
      correctAnswer: 2,
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
      question: "Which type of attack does Arcium dark pools mitigate?",
      options: [
        "Smart contract vulnerabilities",
        "Front-running and sandwich attacks",
        "Consensus failures",
        "Network partitions",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 204,
      question: "Which company partners with Arcium for encrypted DeFi?",
      options: ["Uniswap", "Darklake", "1inch", "Curve"],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 205,
      question: "What does MEV stand for?",
      options: [
        "Maximum Exchange Value",
        "Market Equity Verification",
        "Maximal Extractable Value",
        "Multi-Exchange Vault",
      ],
      correctAnswer: 2,
      section: "darkpools",
    },
    {
      id: 206,
      question: "How do dark pools prevent price manipulation?",
      options: [
        "They don't - price manipulation is still possible",
        "By keeping orders private until settlement, preventing predatory trading",
        "Through centralized price controls",
        "By eliminating all trading",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 207,
      question: "What is a sandwich attack in the context of blockchain?",
      options: [
        "An attack on blockchain infrastructure",
        "Placing transactions before and after a target transaction to profit",
        "Attacking the blockchain network physically",
        "A denial of service attack",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
  ],
  architecture: [
    {
      id: 301,
      question: "What does MXE stand for in the Arcium ecosystem?",
      options: [
        "Multi-eXecution Environment",
        "Multiparty eXecution Environment",
        "Managed eXternal Environment",
        "Multi-party eXchange Engine",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 302,
      question: "What role do Arx nodes play in Arcium's network?",
      options: [
        "Mining cryptocurrency for rewards",
        "Decentralized nodes that perform confidential computing and hold key shares for MPC protocols",
        "Storing user private keys",
        "Managing wallet transactions only",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 303,
      question: "What security measure does Arcium implement for Arx node operators?",
      options: [
        "No requirements or penalties",
        "Staking collateral with penalties for misbehavior to ensure network integrity",
        "Centralized approval process",
        "Token burning only",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 304,
      question: "What is a key advantage of Arcium's parallel execution model?",
      options: [
        "It runs all operations sequentially for security",
        "It requires centralized processing",
        "It enables multiple computations simultaneously on encrypted data with independent MXE states",
        "It's incompatible with high-throughput requirements",
      ],
      correctAnswer: 2,
      section: "architecture",
    },
    {
      id: 305,
      question: "How are data fragments distributed across Arx nodes?",
      options: [
        "Each node receives the complete data",
        "Through secret sharing where no single node has full access",
        "Data is stored on a centralized server",
        "Data is not shared - each node works independently",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 306,
      question: "What is threshold encryption in Arcium?",
      options: [
        "Encryption that stores all keys in one place",
        "Encryption requiring a minimum number of authorized nodes to decrypt",
        "Simple password-based encryption",
        "Encryption that expires after a time limit",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 307,
      question: "What is Arcium's Cerberus protocol designed to resist?",
      options: ["Network latency", "Side-channel attacks", "Transaction fees", "User input errors"],
      correctAnswer: 1,
      section: "architecture",
    },
  ],
  pets: [
    {
      id: 401,
      question: "What are Privacy-Enhancing Technologies (PETs)?",
      options: [
        "Tools that allow access and analysis of sensitive data without exposing personal information",
        "Methods to increase data storage capacity",
        "Blockchain consensus mechanisms",
        "Network protocols for internet speed",
      ],
      correctAnswer: 0,
      section: "pets",
    },
    {
      id: 402,
      question: "Which cryptographic technique does Arcium primarily use?",
      options: [
        "Advanced Encryption Standard (AES) only",
        "Multi-Party Computation (MPC)",
        "RSA Encryption exclusively",
        "SHA-256 Hashing",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 403,
      question: "What does homomorphic encryption enable?",
      options: [
        "Faster internet speeds",
        "Computation directly on encrypted data without decryption",
        "Token generation",
        "Network routing optimization",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 404,
      question: "What is the relationship between Zero-Knowledge Proofs and Arcium?",
      options: [
        "They are incompatible",
        "ZKPs prove statements without revealing information and complement Arcium's privacy model",
        "They replace MPC entirely",
        "They are not used in the ecosystem",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 405,
      question: "What is the importance of privacy in computing today?",
      options: [
        "Privacy has no importance",
        "Protects personal data, prevents discrimination, secures proprietary information, and maintains human autonomy",
        "Privacy is only relevant for criminals",
        "Privacy slows down computing",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 406,
      question: "How does MPC allow data collaboration?",
      options: [
        "By sharing all raw data publicly",
        "Multiple parties compute on subsets of data without revealing individual information",
        "Through centralized data storage",
        "By encrypting data but sharing encryption keys",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 407,
      question: "What is a Zero-Knowledge Proof?",
      options: [
        "A proof that reveals all information",
        "A method to prove a statement is true without revealing the underlying information",
        "A proof of ownership of tokens",
        "A way to eliminate privacy",
      ],
      correctAnswer: 1,
      section: "pets",
    },
  ],
  applications: [
    {
      id: 501,
      question: "What advantage does confidential computing bring to gaming?",
      options: [
        "Slower game processing",
        "Protection of in-game assets and player data while maintaining game state integrity",
        "Reduced game graphics quality",
        "Elimination of all gaming exploits",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 502,
      question: "What does DePIN stand for?",
      options: [
        "Decentralized Processing Infrastructure Network",
        "Digital Enhancement Protocol for Internet",
        "Decentralized Physical Infrastructure Networks",
        "Data Protection Intelligence Network",
      ],
      correctAnswer: 2,
      section: "applications",
    },
    {
      id: 503,
      question: "How can AI/ML models benefit from Arcium's infrastructure?",
      options: [
        "They cannot use Arcium",
        "By training on encrypted data without exposing sensitive information",
        "Only through public data",
        "By centralizing all model training",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 504,
      question: "In healthcare, how does Arcium enable data collaboration?",
      options: [
        "It doesn't support healthcare",
        "By enabling medical research on encrypted patient data without revealing individual information",
        "Through centralized data collection",
        "Using only traditional database encryption",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 505,
      question: "What DePIN use case benefits from Arcium's privacy?",
      options: [
        "Public data collection only",
        "Infrastructure networks protecting device data and network status privacy",
        "Eliminating all data sharing",
        "Making infrastructure completely transparent",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 506,
      question: "How does Arcium improve AI model training?",
      options: [
        "It slows down training",
        "Enables training on sensitive data without exposing it to untrusted parties",
        "It eliminates AI capabilities",
        "By making data completely inaccessible",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 507,
      question: "What gaming assets does Arcium protect?",
      options: [
        "No assets - gaming doesn't benefit from privacy",
        "In-game items, user wallets, and player profiles from unauthorized access",
        "Only graphics files",
        "Server infrastructure only",
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
