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
    slug: "plasma-one-core-chatgpt-go",
    title: "Plasma One：返现 3%、AI 订阅返现 5%，开通就送 ChatGPT Go",
    description:
      "Plasma One 开放注册，新卡段支持绑定微信和支付宝；使用 APPAPP 邀请码可获得 Core 等级一年，享受 3% 消费返现与 AI 订阅返现。",
    readingTime: "8 分钟",
    keywords: ["Plasma One", "APPAPP", "ChatGPT Go", "AI 订阅返现", "U 卡返现"],
    sections: [
      {
        heading: "Plasma One 今日正式开放注册",
        body: [
          "Plasma One 是来自 XPL 项目的 U 卡产品，主打稳定币消费、返现权益和订阅优惠。新卡段目前已经可以绑定微信和支付宝，日常使用场景会比传统加密卡更接近普通银行卡。",
          "此前参与内测的旧卡用户，后续也会统一升级到新卡体系。通过 APPDO 的 KOL 邀请码注册 Plasma One，可以免费获得 Core 等级一年使用期。Core 原价为 120 美元 / 年，现在使用邀请码即可免费领取。",
          "邀请码：APPAPP。该邀请码可多次使用。",
        ],
      },
      {
        heading: "Plasma One 是什么",
        body: [
          "Plasma One 可以理解为 XPL 生态推出的稳定币消费卡。用户完成开户和 KYC 后，可以通过卡片进行日常支付，并根据不同卡等级获得消费返现、AI 订阅返现、订阅权益赠送等福利。",
          "它的亮点主要集中在三个方向：第一，新卡段可以绑定微信和支付宝；第二，返现权益较高，使用 KOL 邀请码可以直接获得 Core 等级，返现提升到 3%，同时支持 AI 订阅返现 5%；第三，Core 等级开通后会赠送 ChatGPT Go。",
        ],
      },
      {
        heading: "使用邀请码 APPAPP 可免费获得 Core 一年",
        body: [
          "Plasma One 默认开户后的免费等级是 Lite，权益为 2% 返现，没有其它额外权益。现在使用 KOL 邀请码 APPAPP 注册，可以免费获得 Core 等级一年使用期。",
          "Core 等级主要权益包括：消费返现 3%、AI 订阅返现 5%、开通即送 ChatGPT Go、Core 等级一年免费使用期。",
          "对普通用户来说，Core 是当前更适合入门的等级。它无需质押大量 XPL，也能获得高于 Lite 的返现比例和 AI 订阅优惠，开通门槛低，权益回收速度也更快。",
        ],
      },
      {
        heading: "ChatGPT 订阅实测可进一步降低成本",
        body: [
          "根据目前测试，使用 Plasma One 购买 ChatGPT 20 美元套餐时，也可以通过返现方式减免 8 美元。在此基础上再叠加 95 折，实际付款约为：（20 - 8）x 95% = 11.4 美元。",
          "也就是说，原价 20 美元的 ChatGPT 订阅，通过 Plasma One 的权益组合后，实际成本可以降到约 11.4 美元。",
          "对于长期订阅 ChatGPT、Claude、Perplexity 或其它 AI 工具的用户来说，这类返现权益比较实用。尤其是 Core 等级已经包含 AI 订阅返现 5%，叠加部分活动后，实际节省金额会更明显。",
        ],
      },
      {
        heading: "其它卡等级说明",
        body: [
          "目前 Plasma One 主要可以分为 Lite、Core 和 Platinum 三个等级。无邀请码开户时，默认免费卡等级为 Lite，可以享受 2% 返现，适合只想低门槛体验卡片功能的用户。",
          "使用邀请码 APPAPP 开户，可以免费获得 Core 等级一年。Core 享受 3% 返现、AI 订阅返现 5%，同时赠送 ChatGPT Go，适合大多数普通用户。",
          "质押 10 万 XPL 后，可以升级为 Platinum 等级。Platinum 享受 4% 返现，并赠送全年 Claude Pro 和 ChatGPT Plus 服务。这个等级更适合本身长期持有 XPL、使用频率高、消费金额较大的用户。",
        ],
      },
      {
        heading: "开户前需要注意什么",
        body: [
          "Plasma One 支持中国护照 KYC，但开户需要提供海外住址证明。也就是说，中国护照本身可以用于身份认证，但用户仍然需要根据平台要求提交符合条件的海外地址证明材料。",
          "准备注册前，请自行判断自己是否符合开户条件，并确保提交的资料真实、清晰、有效。涉及 KYC、地址证明、卡片使用地区、支付绑定等问题，后续也可能随着平台政策和风控规则调整。",
          "Plasma One 属于加密货币相关卡片产品，使用前应了解稳定币充值、卡片消费、返现发放、汇率、手续费、KYC 和账户合规风险。卡片权益很适合日常消费和 AI 订阅用户，但仍建议按个人实际需求开通使用。",
        ],
      },
      {
        heading: "注册方式",
        body: [
          "Plasma One 已经在 App Store 上线，可以通过官方页面或 App Store 下载应用。注册时填写邀请码 APPAPP，即可按当前活动规则领取对应权益。",
          "新卡段已经支持绑定微信和支付宝，Core 等级又能免费领取一年。对于正在使用 ChatGPT、Claude 等 AI 工具，或者平时有稳定币消费需求的用户来说，可以优先注册体验。",
        ],
      },
    ],
  },
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
