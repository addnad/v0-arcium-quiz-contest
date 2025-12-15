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
    questionCount: 15,
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
    questionCount: 15,
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
    questionCount: 15,
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
    questionCount: 15,
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
    questionCount: 15,
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
    questionCount: 15,
    info: {
      headline: "Arcium Applications: Changing Industries",
      description:
        "Arcium's applications span a wide range of industries, transforming how data is handled and processed while maintaining privacy. In gaming, Arcium protects in-game assets, user wallets, and player profiles from unauthorized access, ensuring a secure environment without compromising game integrity. For AI and machine learning, Arcium enables training on encrypted enterprise data, allowing companies to analyze sensitive information securely and without exposing it to untrusted parties. DePIN, or Decentralized Physical Infrastructure Networks, uses Arcium's privacy capabilities to protect critical infrastructure data, ensuring that network status and device information remain confidential. In healthcare, Arcium facilitates privacy-preserving medical research, allowing scientists to collaborate on data without revealing individual patient information. These applications demonstrate Arcium's versatility in creating secure, private environments for various use cases, from gaming and AI to infrastructure and medical research.",
    },
  },
  {
    id: "rtg",
    name: "RTGs",
    title: "Retroactive Token Grants",
    description: "Rewarding early contributors and builders",
    icon: "🎁",
    color: "from-green-500 to-emerald-600",
    questionCount: 15,
    info: {
      headline: "RTGs: Retroactive Token Grants",
      description:
        "Retroactive Token Grants (RTGs) represent a revolutionary approach to rewarding early contributors, builders, and community members who contributed to Arcium's ecosystem before token launch. Unlike traditional token distributions, RTGs recognize and compensate participants based on their historical contributions, usage, and support of the network. This mechanism ensures that those who believed in and helped build Arcium during its early stages are properly rewarded. RTGs can include developers who built on the testnet, community members who provided feedback and evangelized the project, researchers who contributed to protocol improvements, and early users who stress-tested the network. The distribution is typically based on verifiable on-chain activity and contributions, creating a fair and transparent rewards system. RTGs align long-term incentives by turning early supporters into stakeholders, fostering a strong community foundation essential for decentralized networks. This approach has become increasingly popular in crypto ecosystems as a way to bootstrap engaged communities and reward genuine contribution over speculation.",
    },
  },
  {
    id: "cspl",
    name: "C-SPL",
    title: "Confidential SPL Tokens",
    description: "Private token standard on Solana",
    icon: "🔐",
    color: "from-pink-500 to-rose-600",
    questionCount: 15,
    info: {
      headline: "C-SPL: Confidential SPL Token Standard",
      description:
        "Confidential SPL (C-SPL) tokens represent an advanced token standard on Solana that enables private transactions while maintaining the efficiency and speed of the Solana blockchain. Built on the SPL token framework, C-SPL adds a critical privacy layer using Arcium's confidential computing capabilities. Unlike standard SPL tokens where all transactions, balances, and movements are publicly visible on-chain, C-SPL tokens encrypt sensitive transaction details including amounts, sender and receiver identities, and token balances. This privacy is achieved through zero-knowledge proofs and encrypted computation, allowing validators to verify transactions without seeing the actual values. C-SPL is essential for enterprise adoption, enabling businesses to transact on-chain without revealing sensitive financial information to competitors. Use cases include private payroll systems, confidential supply chain payments, institutional trading without information leakage, and compliant but private stablecoin transactions. The standard maintains Solana's high throughput and low costs while adding institutional-grade privacy, making it suitable for real-world financial applications that require both performance and confidentiality.",
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
    {
      id: 6,
      question: "What is Arcis in the Arcium ecosystem?",
      options: [
        "A cryptocurrency wallet",
        "The Rust-based developer framework for building confidential applications",
        "A blockchain consensus mechanism",
        "A token management system",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 7,
      question: "What does Arcium's parallel execution model enable?",
      options: [
        "Sequential processing only",
        "Independent tasks to run simultaneously for maximum throughput",
        "Slower but more secure computation",
        "Centralized data processing",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 8,
      question: "Which industry does Arcium specifically enable for protected intellectual property?",
      options: ["Retail", "Machine Learning and AI", "Real Estate", "Transportation"],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 9,
      question: "What makes Arcium different from traditional cloud computing?",
      options: [
        "It's slower",
        "It enables computation on fully encrypted data without exposing it",
        "It only works on mobile devices",
        "It requires manual approval for every transaction",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 10,
      question: "What type of nodes power Arcium's network?",
      options: [
        "Validator nodes only",
        "Arx Nodes performing secure multi-party computation",
        "Mining nodes",
        "Storage nodes",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 11,
      question: "What is the core cryptographic protocol Arcium uses?",
      options: ["Proof of Work", "Multi-Party Computation (MPC)", "SHA-256 hashing", "RSA encryption"],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 12,
      question: "Which DeFi application does Arcium enable through confidential computing?",
      options: [
        "Public transparent trading only",
        "Collaborative fraud detection without data exposure",
        "Unencrypted staking",
        "Open order books only",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 13,
      question: "What does 'trustless' mean in the context of Arcium?",
      options: [
        "Users cannot trust the network",
        "No single entity has access to unencrypted data during computation",
        "All transactions are visible",
        "No security guarantees",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 14,
      question: "What role does Solana play in Arcium's architecture?",
      options: [
        "Data storage only",
        "Chain-level enforcement and orchestration",
        "User interface hosting",
        "Token minting exclusively",
      ],
      correctAnswer: 1,
      section: "arcium",
    },
    {
      id: 15,
      question: "What is the primary goal of Arcium's technology?",
      options: [
        "Increase transaction fees",
        "Enable secure computation while maintaining data privacy and utility",
        "Replace all existing blockchains",
        "Create a new social network",
      ],
      correctAnswer: 1,
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
    {
      id: 106,
      question: "What problem does Umbra solve for DeFi traders?",
      options: [
        "Slow transaction speeds",
        "Surveillance and lack of privacy in transparent blockchains",
        "High gas fees",
        "Complex user interfaces",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 107,
      question: "How does Umbra maintain compliance while providing privacy?",
      options: [
        "By making all data public",
        "Through encrypted transactions that are still auditable",
        "By removing all transaction records",
        "Through centralized approval processes",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 108,
      question: "What makes Umbra transactions different from standard Solana transactions?",
      options: [
        "They are slower",
        "Transaction data is encrypted and unlinkable",
        "They cost more SOL",
        "They can only be used for NFTs",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 109,
      question: "What type of users benefit most from Umbra?",
      options: [
        "Only institutional traders",
        "Traders needing protection from surveillance and MEV extraction",
        "NFT collectors exclusively",
        "Social media users",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 110,
      question: "What technology powers Umbra's privacy features?",
      options: [
        "Simple password encryption",
        "Arcium's Multi-Party Computation network",
        "VPN technology",
        "Blockchain forks",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 111,
      question: "Can Umbra transactions be audited by authorized parties?",
      options: [
        "No, they are completely hidden",
        "Yes, they are auditable while maintaining privacy",
        "Only by the blockchain creator",
        "Only after 30 days",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 112,
      question: "What does 'institutional-grade privacy' mean for Umbra?",
      options: [
        "Only institutions can use it",
        "Privacy standards meeting the needs of professional and retail traders",
        "Requires government approval",
        "More expensive transactions",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 113,
      question: "How does Umbra settle transactions?",
      options: [
        "Off-chain only",
        "On-chain with encrypted details",
        "Through email confirmation",
        "Via centralized databases",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 114,
      question: "What gap in the DeFi ecosystem does Umbra address?",
      options: [
        "Lack of trading platforms",
        "Need for privacy without sacrificing regulatory compliance",
        "Insufficient token variety",
        "Slow block times",
      ],
      correctAnswer: 1,
      section: "umbra",
    },
    {
      id: 115,
      question: "What class of applications does Umbra enable on Solana?",
      options: [
        "Gaming applications only",
        "Confidential financial applications",
        "Social media platforms",
        "Video streaming services",
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
    {
      id: 206,
      question: "Why do transparent order books create vulnerability for traders?",
      options: [
        "They are too complex",
        "They expose every trade to sophisticated attackers enabling price manipulation",
        "They require too much gas",
        "They only work on Ethereum",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 207,
      question: "What is MEV in the context of dark pools?",
      options: [
        "Maximum Execution Value",
        "Miner Extractable Value - profit extracted by reordering transactions",
        "Minimum Entry Value",
        "Market Exchange Volume",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 208,
      question: "How do dark pools protect large traders?",
      options: [
        "By limiting transaction sizes",
        "By keeping order execution hidden preventing market impact and manipulation",
        "By requiring government ID",
        "By increasing transaction fees",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 209,
      question: "What happens to trades in a dark pool before completion?",
      options: [
        "They are broadcast publicly",
        "They remain hidden and confidential",
        "They are cancelled automatically",
        "They are sent to validators",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 210,
      question: "Why is Darklake partnering with Arcium?",
      options: [
        "For faster transactions",
        "To deliver end-to-end encrypted trading venues",
        "To reduce blockchain size",
        "To create a new token",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 211,
      question: "What is a 'sandwich attack' that dark pools prevent?",
      options: [
        "A type of DDoS attack",
        "Front-running and back-running a transaction to extract value",
        "A consensus mechanism",
        "A smart contract vulnerability",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 212,
      question: "Who benefits from dark pool infrastructure?",
      options: [
        "Only hedge funds",
        "Both institutional and retail traders needing protected execution",
        "Only cryptocurrency miners",
        "Government agencies exclusively",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 213,
      question: "What makes dark pools essential for serious DeFi participants?",
      options: [
        "Lower fees",
        "Protection from transparent execution and predatory trading algorithms",
        "Faster settlement",
        "Better user interfaces",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 214,
      question: "How do copy-traders exploit transparent order books?",
      options: [
        "By hacking wallets",
        "By mimicking successful traders' positions visible on-chain",
        "By stealing private keys",
        "By creating fake tokens",
      ],
      correctAnswer: 1,
      section: "darkpools",
    },
    {
      id: 215,
      question: "What represents the future of competitive markets according to dark pool proponents?",
      options: [
        "Fully transparent trading",
        "Protected execution venues preventing extraction and manipulation",
        "Centralized exchanges only",
        "Unregulated trading platforms",
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
    {
      id: 306,
      question: "What happens to Arx Nodes that misbehave?",
      options: [
        "Nothing",
        "They are economically penalized through staked collateral slashing",
        "They get a warning",
        "They receive more tokens",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 307,
      question: "What does 'threshold' mean in secret sharing?",
      options: [
        "Maximum data size",
        "Minimum number of shares required to reconstruct the secret",
        "Network speed limit",
        "Transaction fee amount",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 308,
      question: "What kind of computations happen in MXEs?",
      options: [
        "Public computations only",
        "Secure multi-party computations on encrypted data",
        "Mining operations",
        "Database queries",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 309,
      question: "How do customers define security in Arcium's MXEs?",
      options: [
        "They can't customize security",
        "By setting their own security parameters within the execution environment",
        "By paying higher fees",
        "Through voting mechanisms",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 310,
      question: "What is the role of cryptographic shares in Arcium?",
      options: [
        "To increase transaction speed",
        "To distribute sensitive data across nodes requiring threshold for reconstruction",
        "To mint new tokens",
        "To validate blocks",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 311,
      question: "What makes Arcium's parallel execution revolutionary?",
      options: [
        "It's slower but safer",
        "Multiple independent computations with complete isolation unlock unprecedented throughput",
        "It only works on weekends",
        "It requires manual approval",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 312,
      question: "Does any single Arx Node have access to unencrypted data?",
      options: [
        "Yes, the first node",
        "No, computation happens on encrypted data with no node accessing plaintext",
        "Yes, but only temporarily",
        "Only validator nodes do",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 313,
      question: "How does Arcium transform traditional blockchain?",
      options: [
        "By making it slower",
        "From transparent-by-default to a programmable encrypted supercomputer",
        "By removing all validators",
        "By centralizing control",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 314,
      question: "What maintains its own state in Arcium's architecture?",
      options: [
        "Only the main chain",
        "Each MXE maintains its own state for maximum throughput",
        "Nothing has state",
        "Only validator nodes",
      ],
      correctAnswer: 1,
      section: "architecture",
    },
    {
      id: 315,
      question: "What protection does the Cerberus protocol specifically add?",
      options: [
        "DDoS protection",
        "Enhanced defense against side-channel attacks",
        "Password encryption",
        "Network routing",
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
    {
      id: 406,
      question: "What is the main difference between PETs and security through obscurity?",
      options: [
        "PETs are free",
        "PETs use mathematical proofs for security guarantees",
        "PETs are only for governments",
        "PETs work offline only",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 407,
      question: "In MPC, who can see the individual inputs of participants?",
      options: [
        "Everyone",
        "No one - inputs remain private while computing joint results",
        "Only the network administrator",
        "Only government regulators",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 408,
      question: "What makes homomorphic encryption powerful for business?",
      options: [
        "It's free to use",
        "Data remains encrypted throughout its lifecycle while still being useful for computation",
        "It eliminates all computational costs",
        "It works without electricity",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 409,
      question: "What practical application do Zero-Knowledge Proofs have for compliance?",
      options: [
        "Eliminating all regulations",
        "Proving compliance conditions are met without revealing sensitive information",
        "Making all data public",
        "Removing need for audits",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 410,
      question: "How do PETs work together in systems like Arcium?",
      options: [
        "They don't interact",
        "They create environments where data stays encrypted yet useful throughout its lifecycle",
        "They replace each other",
        "They only work individually",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 411,
      question: "What example illustrates MPC in everyday terms?",
      options: [
        "Sharing passwords publicly",
        "Calculating average salary without anyone seeing individual salaries",
        "Broadcasting all data to everyone",
        "Removing all encryption",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 412,
      question: "Who can decrypt results from homomorphic encryption?",
      options: [
        "Anyone with internet access",
        "Only authorized parties with the decryption key",
        "All network participants",
        "No one ever",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 413,
      question: "What promise do PETs deliver on?",
      options: [
        "Free computation",
        "Data utility without privacy compromise",
        "Elimination of all security threats",
        "Instant processing speeds",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 414,
      question: "Why is understanding PETs essential for confidential computing?",
      options: [
        "It's not essential",
        "They form the cryptographic foundation enabling encrypted computation while maintaining utility",
        "It's only for academics",
        "It's only relevant for marketing",
      ],
      correctAnswer: 1,
      section: "pets",
    },
    {
      id: 415,
      question: "What makes PETs different from simply hiding data?",
      options: [
        "Nothing, they're the same",
        "PETs enable computation and analysis while data remains encrypted",
        "PETs make data public",
        "PETs delete all data",
      ],
      correctAnswer: 1,
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
    {
      id: 506,
      question: "What gaming security issue does Arcium solve?",
      options: [
        "Slow game loading",
        "Unauthorized access to in-game assets and player profiles",
        "Low frame rates",
        "Poor graphics quality",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 507,
      question: "How does Arcium enable secure AI training?",
      options: [
        "By making all data public",
        "By allowing companies to analyze sensitive enterprise data without exposure to untrusted parties",
        "By eliminating neural networks",
        "By reducing model accuracy",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 508,
      question: "What infrastructure data does DePIN protect with Arcium?",
      options: [
        "Public marketing data",
        "Network status and critical device information",
        "Social media posts",
        "Website analytics",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 509,
      question: "What healthcare collaboration does Arcium facilitate?",
      options: [
        "Public patient record sharing",
        "Privacy-preserving research allowing scientists to collaborate without revealing individual patient data",
        "Eliminating medical confidentiality",
        "Replacing medical professionals",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 510,
      question: "What common requirement connects all Arcium applications?",
      options: [
        "High transaction fees",
        "Data security and privacy being paramount",
        "Public transparency",
        "Government oversight",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 511,
      question: "How does Arcium protect game integrity?",
      options: [
        "By removing all encryption",
        "By securing assets and profiles without compromising game functionality",
        "By making all game data public",
        "By slowing down gameplay",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 512,
      question: "What industries does Arcium serve according to its core applications?",
      options: [
        "Only finance",
        "AI, DeFi, DePIN, gaming, and healthcare among others",
        "Only healthcare",
        "Only gaming",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 513,
      question: "What new use cases does Arcium enable?",
      options: [
        "Traditional unencrypted applications",
        "Entirely new applications where data security is paramount",
        "Only existing use cases",
        "Social media clones",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 514,
      question: "How does Arcium demonstrate versatility?",
      options: [
        "By focusing on one industry only",
        "By creating secure, private environments for diverse use cases across industries",
        "By limiting functionality",
        "By only supporting text data",
      ],
      correctAnswer: 1,
      section: "applications",
    },
    {
      id: 515,
      question: "What finance application does Arcium uniquely enable?",
      options: [
        "Public ledger sharing",
        "Collaborative fraud detection while maintaining institutional data control",
        "Eliminating all security measures",
        "Sharing customer data publicly",
      ],
      correctAnswer: 1,
      section: "applications",
    },
  ],
  rtg: [
    {
      id: 601,
      question: "What does RTG stand for in the Arcium ecosystem?",
      options: [
        "Random Token Generator",
        "Retroactive Token Grants",
        "Real-Time Governance",
        "Rapid Transaction Gateway",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 602,
      question: "What is the primary purpose of RTGs?",
      options: [
        "To punish late adopters",
        "To reward early contributors and builders who supported Arcium before token launch",
        "To generate random tokens",
        "To increase token supply",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 603,
      question: "How do RTGs differ from traditional token distributions?",
      options: [
        "They are more expensive",
        "They recognize and compensate based on historical contributions and activity",
        "They only reward developers",
        "They have no criteria",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 604,
      question: "Who typically qualifies for RTGs?",
      options: [
        "Only venture capital investors",
        "Early developers, community members, researchers, and testnet users who contributed",
        "People who bought tokens on exchanges",
        "Only the founding team",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 605,
      question: "What type of activity can qualify someone for RTGs?",
      options: [
        "Only social media posts",
        "Verifiable on-chain activity, testnet participation, and meaningful contributions",
        "Watching YouTube videos",
        "Following on Twitter only",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 606,
      question: "Why are RTGs important for network growth?",
      options: [
        "They increase token price immediately",
        "They align long-term incentives by turning early supporters into stakeholders",
        "They are not important",
        "They only benefit the team",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 607,
      question: "What makes RTG distribution fair and transparent?",
      options: [
        "Random selection",
        "Based on verifiable on-chain contributions and documented activity",
        "First come first served",
        "Social media popularity",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 608,
      question: "What problem do RTGs solve in token distribution?",
      options: [
        "High gas fees",
        "Ensuring genuine contributors are rewarded over pure speculators",
        "Slow transaction times",
        "Token naming conflicts",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 609,
      question: "When are RTGs typically distributed?",
      options: [
        "Before the project starts",
        "Retroactively after token launch to recognize early contributions",
        "Only on holidays",
        "Never",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 610,
      question: "What type of community does RTG distribution help build?",
      options: [
        "Short-term traders only",
        "Engaged, long-term community with aligned incentives",
        "Passive observers",
        "Competitor networks",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 611,
      question: "Can testnet users qualify for RTGs?",
      options: [
        "No, never",
        "Yes, especially those who stress-tested the network and provided feedback",
        "Only if they paid fees",
        "Only enterprise users",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 612,
      question: "What role do researchers play in RTG eligibility?",
      options: [
        "No role at all",
        "Contributors to protocol improvements and documentation can qualify",
        "Only if they have PhDs",
        "Only corporate researchers",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 613,
      question: "Why have RTGs become popular in crypto projects?",
      options: [
        "They are legally required",
        "They bootstrap engaged communities and reward genuine contribution over speculation",
        "They reduce development costs",
        "They eliminate all risk",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 614,
      question: "What is a key benefit of RTG distribution over airdrops?",
      options: [
        "Faster distribution",
        "Rewards are based on actual contributions rather than token holdings or random criteria",
        "Lower transaction costs",
        "Fewer participants",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
    {
      id: 615,
      question: "How do RTGs foster network decentralization?",
      options: [
        "They don't affect decentralization",
        "By distributing tokens to genuine early supporters and builders across the ecosystem",
        "By concentrating tokens in few hands",
        "By eliminating all validators",
      ],
      correctAnswer: 1,
      section: "rtg",
    },
  ],
  cspl: [
    {
      id: 701,
      question: "What does C-SPL stand for?",
      options: [
        "Crypto SPL Library",
        "Confidential SPL Token Standard",
        "Central SPL Protocol",
        "Certified SPL License",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 702,
      question: "Which blockchain is C-SPL built on?",
      options: ["Ethereum", "Solana", "Polygon", "Avalanche"],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 703,
      question: "What makes C-SPL different from standard SPL tokens?",
      options: [
        "Higher transaction fees",
        "Encrypted transaction details including amounts, balances, and identities",
        "Slower processing",
        "Limited token supply",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 704,
      question: "What technology enables C-SPL's privacy features?",
      options: [
        "Simple password protection",
        "Zero-knowledge proofs and Arcium's encrypted computation",
        "VPN tunneling",
        "Data deletion",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 705,
      question: "What sensitive information does C-SPL encrypt?",
      options: [
        "Only wallet addresses",
        "Transaction amounts, sender/receiver identities, and token balances",
        "Only timestamps",
        "Nothing at all",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 706,
      question: "Why is C-SPL important for enterprise adoption?",
      options: [
        "It's not important",
        "Enables businesses to transact without revealing sensitive financial information",
        "It makes transactions slower",
        "It increases costs significantly",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 707,
      question: "How do validators verify C-SPL transactions?",
      options: [
        "They cannot verify them",
        "Through zero-knowledge proofs without seeing actual transaction values",
        "By decrypting everything",
        "By asking the sender",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 708,
      question: "What performance characteristics does C-SPL maintain from Solana?",
      options: [
        "Slow speeds and high costs",
        "High throughput and low transaction costs",
        "Medium speed only",
        "No performance guarantees",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 709,
      question: "What is a key use case for C-SPL in business?",
      options: [
        "Public marketing campaigns",
        "Private payroll systems and confidential supply chain payments",
        "Social media posts",
        "Public fundraising",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 710,
      question: "How does C-SPL benefit institutional traders?",
      options: [
        "It doesn't help them",
        "Enables trading without information leakage to competitors",
        "Only increases their costs",
        "Slows down their operations",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 711,
      question: "Can C-SPL be used for stablecoin transactions?",
      options: [
        "No, never",
        "Yes, enabling compliant but private stablecoin transactions",
        "Only for USDC",
        "Only in certain countries",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 712,
      question: "What problem does C-SPL solve for businesses on public blockchains?",
      options: [
        "High electricity usage",
        "Prevents competitors from seeing sensitive transaction data",
        "Token naming issues",
        "Wallet compatibility",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 713,
      question: "What level of privacy does C-SPL provide?",
      options: [
        "No privacy at all",
        "Institutional-grade privacy suitable for real-world financial applications",
        "Minimal privacy",
        "Only hides wallet names",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 714,
      question: "How does C-SPL handle balance visibility?",
      options: [
        "All balances are public",
        "Token balances are encrypted and private",
        "Only shows to government",
        "Balances are deleted",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
    {
      id: 715,
      question: "What makes C-SPL suitable for enterprise finance?",
      options: [
        "Lower security",
        "Combination of Solana's performance with institutional-grade privacy and confidentiality",
        "Higher costs only",
        "Limited functionality",
      ],
      correctAnswer: 1,
      section: "cspl",
    },
  ],
}

export function getQuestionsBySection(sectionId: string, excludeIds: number[] = []): Question[] {
  const questions = QUESTIONS_BY_SECTION[sectionId] || []
  const filtered = questions.filter((q) => !excludeIds.includes(q.id))

  // Shuffle all questions
  const shuffled = filtered.sort(() => 0.5 - Math.random())

  // Return only first 5 questions for the quiz
  return shuffled.slice(0, 5)
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
