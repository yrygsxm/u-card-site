export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  keywords: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const guideArticles: GuideArticle[] = [
  {
    slug: "what-is-u-card",
    title: "什么是 U 卡",
    description: "用加密资产或稳定币余额支持消费的银行卡、预付卡或虚拟卡产品总称。",
    readingTime: "5 分钟",
    keywords: ["U 卡", "加密货币银行卡", "USDT 银行卡"],
    sections: [
      {
        heading: "核心定义",
        body: [
          "中文语境里的 U 卡通常指可以用 USDT、USDC 或其他加密资产充值、再通过 Visa 或 Mastercard 网络消费的卡产品。",
          "它可能是借记卡、预付卡、虚拟卡，也可能与交易所、钱包或借贷平台账户绑定。",
        ],
      },
      {
        heading: "需要重点核验",
        body: [
          "最重要的不是名义返现，而是你所在地区能否申请、KYC 是否能通过、费用是否透明、风控规则是否适合你的交易习惯。",
        ],
      },
    ],
  },
  {
    slug: "u-card-vs-bank-card",
    title: "U 卡和普通银行卡有什么区别",
    description: "比较资金来源、发卡机构、KYC、账户冻结、税务和消费场景差异。",
    readingTime: "6 分钟",
    keywords: ["U 卡", "普通银行卡", "虚拟卡"],
    sections: [
      {
        heading: "资金来源不同",
        body: [
          "普通银行卡通常绑定银行账户，U 卡则可能绑定交易所账户、钱包余额、稳定币余额或加密资产抵押额度。",
          "当你用加密资产消费时，平台可能在交易时自动兑换成法币，这会带来价差、费用和税务记录。",
        ],
      },
      {
        heading: "规则变化更快",
        body: [
          "U 卡依赖发卡机构、卡组织、加密平台和当地监管，多方规则任一变化都可能影响可用性。",
        ],
      },
    ],
  },
  {
    slug: "is-u-card-safe",
    title: "U 卡是否安全",
    description: "从平台风险、发卡方风险、资金来源审查和个人信息安全角度判断。",
    readingTime: "7 分钟",
    keywords: ["U 卡安全", "账户冻结", "KYC"],
    sections: [
      {
        heading: "安全不是单一维度",
        body: [
          "需要同时看平台合规、资金托管方式、卡片网络、KYC 资料处理、客服响应和账户冻结处理流程。",
          "不要把小额试用体验直接推导成大额稳定使用结论。",
        ],
      },
      {
        heading: "降低风险的做法",
        body: [
          "保持资金来源清晰，避免异常高频交易，不把全部资产放在单一平台，保存官方费用和条款截图。",
        ],
      },
    ],
  },
  {
    slug: "top-up-usdt",
    title: "U 卡如何充值 USDT",
    description: "理解链上充值、平台账户划转、自动兑换和网络费用。",
    readingTime: "5 分钟",
    keywords: ["USDT 充值", "稳定币", "U 卡充值"],
    sections: [
      {
        heading: "常见路径",
        body: [
          "多数产品不会让卡片直接持有 USDT，而是让你把 USDT 充值到平台账户，再消费时自动兑换成卡片结算币种。",
          "需要确认支持的网络，例如 TRC20、ERC20、Polygon 或其他链，避免充错链。",
        ],
      },
      {
        heading: "费用构成",
        body: [
          "实际成本通常包括链上网络费、平台兑换费、消费费、外汇费和可能的提现费。",
        ],
      },
    ],
  },
  {
    slug: "bind-apple-pay",
    title: "U 卡如何绑定 Apple Pay",
    description: "绑定前先确认地区、卡组织、设备地区和发卡方支持。",
    readingTime: "4 分钟",
    keywords: ["Apple Pay", "U 卡", "虚拟卡"],
    sections: [
      {
        heading: "先看地区支持",
        body: [
          "同一张卡在不同地区可能对 Apple Pay 支持不同。不要只看官网首页宣传，需要看你账户内的卡片详情或地区帮助中心。",
        ],
      },
      {
        heading: "失败排查",
        body: [
          "常见问题包括设备地区不匹配、卡片尚未激活、KYC 未完成、发卡国家不支持钱包、风控拒绝绑定。",
        ],
      },
    ],
  },
  {
    slug: "cashback-math",
    title: "U 卡返现怎么算",
    description: "名义返现、费用、外汇损耗和返现上限要放在同一个模型里看。",
    readingTime: "6 分钟",
    keywords: ["U 卡返现", "返现计算器", "手续费"],
    sections: [
      {
        heading: "不要只看最高比例",
        body: [
          "名义返现可能只适用于特定等级、活动期、消费类别或月度上限。计算实际收益时应扣除消费费、外汇费和平台兑换成本。",
        ],
      },
      {
        heading: "简单公式",
        body: [
          "实际收益约等于返现金额减去消费手续费、外汇手续费、入金费用和持仓/订阅成本。",
        ],
      },
    ],
  },
  {
    slug: "kyc-documents",
    title: "U 卡 KYC 需要准备什么",
    description: "整理身份证件、地址证明、自拍验证和资金来源材料。",
    readingTime: "5 分钟",
    keywords: ["KYC", "地址证明", "U 卡申请"],
    sections: [
      {
        heading: "基础材料",
        body: [
          "通常需要护照、身份证或居留卡，配合自拍活体验证。部分地区还会要求地址证明，例如银行账单、水电账单或政府信件。",
        ],
      },
      {
        heading: "资金来源",
        body: [
          "大额或异常交易后，平台可能要求解释资金来源。提前保存交易记录和入金来源会降低沟通成本。",
        ],
      },
    ],
  },
  {
    slug: "frozen-account",
    title: "U 卡被冻结怎么办",
    description: "先判断冻结范围，再整理资料和官方工单沟通。",
    readingTime: "7 分钟",
    keywords: ["U 卡冻结", "账户冻结", "风控"],
    sections: [
      {
        heading: "先确认冻结范围",
        body: [
          "需要区分是卡片冻结、消费拒付、平台账户冻结，还是某笔交易等待审查。不同状态对应完全不同的处理路径。",
        ],
      },
      {
        heading: "沟通材料",
        body: [
          "准备身份证明、地址证明、交易截图、资金来源说明和消费用途说明。避免重复提交矛盾信息。",
        ],
      },
    ],
  },
  {
    slug: "japan-users",
    title: "日本用户如何选择 U 卡",
    description: "关注日本在留身份、Apple Pay、便利店、交通卡和外汇成本。",
    readingTime: "6 分钟",
    keywords: ["日本 U 卡", "Apple Pay", "便利店"],
    sections: [
      {
        heading: "申请前置条件",
        body: [
          "日本用户要先确认是否接受日本居住地址、日本在留卡或护照，且不要假设支持日本消费就等于支持日本居民申请。",
        ],
      },
      {
        heading: "使用体验",
        body: [
          "日本线下消费高度依赖实体卡、IC/触碰支付和移动钱包。交通卡充值、便利店消费和订阅服务需要逐项小额测试。",
        ],
      },
    ],
  },
  {
    slug: "mainland-china-users",
    title: "中国大陆用户还能申请哪些 U 卡",
    description: "区分大陆居住地、护照、境外居住身份和平台服务限制。",
    readingTime: "7 分钟",
    keywords: ["中国大陆 U 卡", "U 卡申请", "护照"],
    sections: [
      {
        heading: "先区分身份和居住地",
        body: [
          "很多产品不是简单按国籍判断，而是同时看居住地、证件、地址证明、IP、手机号和资金来源。",
          "持有中国大陆护照但居住在受支持地区，与中国大陆居民直接申请，是两个不同问题。",
        ],
      },
      {
        heading: "谨慎看待代开卡",
        body: [
          "代开卡、借用身份和规避 KYC 的做法很容易导致冻结、拒付和资金损失，不适合作为长期方案。",
        ],
      },
    ],
  },
  {
    slug: "fees-to-watch",
    title: "使用 U 卡消费需要注意哪些费用",
    description: "开卡费、月费、外汇费、自动兑换费、ATM 费和退款成本。",
    readingTime: "6 分钟",
    keywords: ["U 卡手续费", "外汇手续费", "ATM 取现"],
    sections: [
      {
        heading: "费用清单",
        body: [
          "至少要看开卡费、实体卡邮寄费、月费、充值费、消费费、外汇费、ATM 费、退款费、换卡费和账户关闭费用。",
        ],
      },
      {
        heading: "真实成本",
        body: [
          "真实成本通常不是某一项费用，而是多项费用叠加后的结果。小额日常消费和大额旅行消费的最优卡可能不同。",
        ],
      },
    ],
  },
  {
    slug: "virtual-credit-card-difference",
    title: "U 卡和虚拟信用卡有什么区别",
    description: "虚拟卡不一定是信用卡，U 卡也不一定支持信用额度。",
    readingTime: "5 分钟",
    keywords: ["虚拟信用卡", "虚拟 U 卡", "Crypto Card"],
    sections: [
      {
        heading: "不要混用概念",
        body: [
          "虚拟信用卡强调线上支付和信用额度，U 卡通常强调加密资产或稳定币余额消费。部分产品是预付卡，不能透支。",
        ],
      },
      {
        heading: "场景差异",
        body: [
          "广告投放、订阅服务、海淘和旅行消费对卡 BIN、发卡国家、风控策略和拒付规则要求不同。",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
}
