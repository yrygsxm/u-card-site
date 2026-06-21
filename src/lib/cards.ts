export type SupportState = "yes" | "no" | "partial" | "unknown";

export type ScoreKey =
  | "cost"
  | "cashback"
  | "availability"
  | "payment"
  | "risk"
  | "experience"
  | "transparency";

export type SourceLink = {
  label: string;
  url: string;
};

export type ScoreItem = {
  label: string;
  max: number;
  score: number;
  reason: string;
};

export type NumericFeeModel = {
  spendingRatePct: number;
  fxRatePct: number;
  atmRatePct: number;
  cashbackRatePct: number;
  cashbackCapUsd?: number;
  openingFeeUsd?: number;
  monthlyFeeUsd?: number;
};

export type CryptoCard = {
  slug: string;
  cardName: string;
  shortName: string;
  brandLogo: string;
  brandColor: string;
  issuer: string;
  cardNetwork: string[];
  officialWebsite: string;
  supportedRegions: string[];
  restrictedRegions: string[];
  applicationRegions: string[];
  residencyRequirement: string;
  mainlandChinaPassportSupport: SupportState;
  japanResidenceCardSupport: SupportState;
  hongKongIdSupport: SupportState;
  kycRequired: boolean;
  kycDocuments: string[];
  proofOfAddressRequired: SupportState;
  virtualCardSupported: boolean;
  physicalCardSupported: boolean;
  metalCardSupported: boolean;
  applePaySupported: SupportState;
  googlePaySupported: SupportState;
  paypalSupported: SupportState;
  curveSupported: SupportState;
  supportedCurrencies: string[];
  supportedStablecoins: string[];
  topUpMethods: string[];
  openingFee: string;
  monthlyFee: string;
  annualFee: string;
  topUpFee: string;
  spendingFee: string;
  fxFee: string;
  atmWithdrawalFee: string;
  freeAtmLimit: string;
  cashbackRate: string;
  cashbackCap: string;
  cashbackCurrency: string;
  cashbackCycle: string;
  cashbackRequirements: string;
  singleTransactionLimit: string;
  monthlySpendingLimit: string;
  atmSingleLimit: string;
  atmMonthlyLimit: string;
  riskLevel: "低" | "中低" | "中" | "中高" | "高";
  freezeRisk: string;
  customerSupportRating: number;
  suitableFor: string[];
  notSuitableFor: string[];
  pros: string[];
  cons: string[];
  summary: string;
  oneLine: string;
  bestFor: string[];
  scenarios: string[];
  riskTags: string[];
  tags: string[];
  sourceStatus: string;
  lastUpdated: string;
  sourceLinks: SourceLink[];
  scoreBreakdown: Record<ScoreKey, ScoreItem>;
  overallScore: number;
  feeModel: NumericFeeModel;
};

export const scoreWeights: ScoreItem[] = [
  {
    label: "费用成本",
    max: 25,
    score: 25,
    reason: "开卡费、月费、消费费、外汇费、ATM 费用和隐性成本。",
  },
  {
    label: "返现权益",
    max: 15,
    score: 15,
    reason: "返现比例、上限、发放周期、门槛和权益稳定性。",
  },
  {
    label: "地区可申请性",
    max: 15,
    score: 15,
    reason: "支持地区、居住地限制、证件适配和 KYC 通过难度。",
  },
  {
    label: "支付便利性",
    max: 15,
    score: 15,
    reason: "实体卡、虚拟卡、Apple Pay、Google Pay、ATM 和订阅场景。",
  },
  {
    label: "稳定性与风控",
    max: 15,
    score: 15,
    reason: "账户冻结风险、合规强度、异常交易容忍度和服务连续性。",
  },
  {
    label: "用户体验",
    max: 10,
    score: 10,
    reason: "App 易用性、客服响应、费用可读性和消费通知体验。",
  },
  {
    label: "透明度与资料完整度",
    max: 5,
    score: 5,
    reason: "官方费用页、地区说明、条款更新和资料公开程度。",
  },
];

const bybitScores: Record<ScoreKey, ScoreItem> = {
  cost: {
    label: "费用成本",
    max: 25,
    score: 18,
    reason: "月费低，部分地区实体卡有制卡费，加密资产自动兑换和跨币种消费存在成本。",
  },
  cashback: {
    label: "返现权益",
    max: 15,
    score: 13,
    reason: "返现活动和等级权益较有吸引力，但比例、上限和适用地区会调整。",
  },
  availability: {
    label: "地区可申请性",
    max: 15,
    score: 11,
    reason: "覆盖多个市场，但具体申请国家、居住地和 KYC 规则分地区管理。",
  },
  payment: {
    label: "支付便利性",
    max: 15,
    score: 13,
    reason: "虚拟卡、实体卡和移动支付覆盖较好，Apple Pay/Google Pay 支持需按地区确认。",
  },
  risk: {
    label: "稳定性与风控",
    max: 15,
    score: 10,
    reason: "交易所账户和卡账户绑定，异常资金来源、地区变化或 KYC 更新会带来限制风险。",
  },
  experience: {
    label: "用户体验",
    max: 10,
    score: 8,
    reason: "App 功能完整，适合已有 Bybit 用户；新手需要理解资金账户和卡账户关系。",
  },
  transparency: {
    label: "透明度与资料完整度",
    max: 5,
    score: 4,
    reason: "官方帮助中心披露费用与限额，但地区版本差异需要逐条核验。",
  },
};

const redotScores: Record<ScoreKey, ScoreItem> = {
  cost: {
    label: "费用成本",
    max: 25,
    score: 15,
    reason: "费用项目集中在开卡、充值、消费和 ATM；不同卡种需以 App 和官方费用页为准。",
  },
  cashback: {
    label: "返现权益",
    max: 15,
    score: 8,
    reason: "主要优势不是高返现，而是稳定币支付和虚拟/实体卡使用场景。",
  },
  availability: {
    label: "地区可申请性",
    max: 15,
    score: 12,
    reason: "面向国际用户，但可申请地区、禁用国家和证件要求会随合作发卡方变化。",
  },
  payment: {
    label: "支付便利性",
    max: 15,
    score: 12,
    reason: "虚拟卡、实体卡和 Apple Pay 是核心卖点，Google Pay/本地钱包仍需按地区确认。",
  },
  risk: {
    label: "稳定性与风控",
    max: 15,
    score: 9,
    reason: "稳定币入金和跨境消费对风控资料要求较高，异常大额交易风险较明显。",
  },
  experience: {
    label: "用户体验",
    max: 10,
    score: 7,
    reason: "产品入口直接，适合稳定币用户；费用和限额对新手不够直观。",
  },
  transparency: {
    label: "透明度与资料完整度",
    max: 5,
    score: 3,
    reason: "官方帮助中心有费用说明，部分细节需要登录 App 或查看最新条款。",
  },
};

const wirexScores: Record<ScoreKey, ScoreItem> = {
  cost: {
    label: "费用成本",
    max: 25,
    score: 20,
    reason: "官方强调无月费、无年费和低外汇成本，但充值、提现和区域性收费仍需核验。",
  },
  cashback: {
    label: "返现权益",
    max: 15,
    score: 12,
    reason: "X-Points 返现上限较高，但权益通常与计划、地区和活动规则绑定。",
  },
  availability: {
    label: "地区可申请性",
    max: 15,
    score: 13,
    reason: "覆盖国家较多，适合欧洲和旅行用户；美国等地区可用性需单独确认。",
  },
  payment: {
    label: "支付便利性",
    max: 15,
    score: 14,
    reason: "实体卡、虚拟卡、移动支付和多币种账户体验较完整。",
  },
  risk: {
    label: "稳定性与风控",
    max: 15,
    score: 11,
    reason: "运营时间较长，但加密资产入金、跨境消费和账户审查仍可能触发限制。",
  },
  experience: {
    label: "用户体验",
    max: 10,
    score: 8,
    reason: "产品成熟度较高，费用、卡和钱包功能集中在一个 App。",
  },
  transparency: {
    label: "透明度与资料完整度",
    max: 5,
    score: 4,
    reason: "公开资料较完整，但部分费用和权益依赖地区页面。",
  },
};

const cryptoComScores: Record<ScoreKey, ScoreItem> = {
  cost: {
    label: "费用成本",
    max: 25,
    score: 17,
    reason: "基础费用清晰，但权益通常和持仓/等级绑定，外汇、ATM 和充值规则需要按地区查看。",
  },
  cashback: {
    label: "返现权益",
    max: 15,
    score: 13,
    reason: "历史上以返现和等级权益知名，当前权益应按官方卡片等级页确认。",
  },
  availability: {
    label: "地区可申请性",
    max: 15,
    score: 12,
    reason: "多地区运营，但卡片发行、KYC 和不支持地区随当地法规变化。",
  },
  payment: {
    label: "支付便利性",
    max: 15,
    score: 14,
    reason: "Visa 卡、实体卡和移动支付生态较成熟，适合日常消费和旅行。",
  },
  risk: {
    label: "稳定性与风控",
    max: 15,
    score: 11,
    reason: "品牌和合规体系较成熟，但交易所资产、质押权益和地区政策变化仍是核心风险。",
  },
  experience: {
    label: "用户体验",
    max: 10,
    score: 8,
    reason: "App 和卡片生态完整，适合愿意使用平台账户体系的用户。",
  },
  transparency: {
    label: "透明度与资料完整度",
    max: 5,
    score: 4,
    reason: "官方网站资料丰富，但地区和等级差异较多，需要用户逐项确认。",
  },
};

const coinbaseScores: Record<ScoreKey, ScoreItem> = {
  cost: {
    label: "费用成本",
    max: 25,
    score: 22,
    reason: "官方强调无消费手续费，但加密资产兑换价差、税务和地区限制仍需考虑。",
  },
  cashback: {
    label: "返现权益",
    max: 15,
    score: 7,
    reason: "返现权益阶段性较强，不应只按活动期比例评估。",
  },
  availability: {
    label: "地区可申请性",
    max: 15,
    score: 6,
    reason: "主要面向美国用户，对日本、香港、欧洲和中国大陆用户参考价值有限。",
  },
  payment: {
    label: "支付便利性",
    max: 15,
    score: 12,
    reason: "Visa 借记卡和移动支付体验清晰，但缺少跨地区申请优势。",
  },
  risk: {
    label: "稳定性与风控",
    max: 15,
    score: 12,
    reason: "合规透明度较高，但美国税务、加密资产出售和交易审查是主要风险。",
  },
  experience: {
    label: "用户体验",
    max: 10,
    score: 8,
    reason: "适合 Coinbase 生态内用户；非美国用户基本不应作为首选。",
  },
  transparency: {
    label: "透明度与资料完整度",
    max: 5,
    score: 4,
    reason: "官方卡片页和帮助中心说明较直接。",
  },
};

const nexoScores: Record<ScoreKey, ScoreItem> = {
  cost: {
    label: "费用成本",
    max: 25,
    score: 19,
    reason: "借记/信用模式会影响真实成本，需同时看利率、外汇和还款规则。",
  },
  cashback: {
    label: "返现权益",
    max: 15,
    score: 11,
    reason: "返现权益对持仓等级和消费模式敏感，适合已有 Nexo 用户。",
  },
  availability: {
    label: "地区可申请性",
    max: 15,
    score: 11,
    reason: "欧洲用户友好度较高，其他地区需确认卡片和账户服务是否开放。",
  },
  payment: {
    label: "支付便利性",
    max: 15,
    score: 14,
    reason: "虚拟卡、实体卡和 Apple Pay/Google Pay 体验较完整。",
  },
  risk: {
    label: "稳定性与风控",
    max: 15,
    score: 11,
    reason: "信用额度、抵押资产和合规审查增加了理解门槛和账户限制风险。",
  },
  experience: {
    label: "用户体验",
    max: 10,
    score: 8,
    reason: "适合已经理解借贷、抵押和卡消费关系的用户。",
  },
  transparency: {
    label: "透明度与资料完整度",
    max: 5,
    score: 4,
    reason: "卡片页面和帮助中心资料较清楚，但模式差异需要阅读条款。",
  },
};

function total(scores: Record<ScoreKey, ScoreItem>) {
  return Object.values(scores).reduce((sum, item) => sum + item.score, 0);
}

type CatalogCardInput = Omit<
  Partial<CryptoCard>,
  "feeModel" | "scoreBreakdown" | "overallScore"
> & {
  slug: string;
  cardName: string;
  shortName: string;
  brandLogo: string;
  brandColor: string;
  officialWebsite: string;
  cashbackRate: string;
  sourceLinks: SourceLink[];
  feeModel?: Partial<NumericFeeModel>;
  scoreBreakdown?: Record<ScoreKey, ScoreItem>;
  overallScore?: number;
};

function assessedScores(
  scores: Record<ScoreKey, number>,
  reason: string,
): Record<ScoreKey, ScoreItem> {
  const keys: ScoreKey[] = [
    "cost",
    "cashback",
    "availability",
    "payment",
    "risk",
    "experience",
    "transparency",
  ];

  return Object.fromEntries(
    keys.map((key, index) => {
      const weight = scoreWeights[index];
      return [key, { label: weight.label, max: weight.max, score: scores[key], reason }];
    }),
  ) as Record<ScoreKey, ScoreItem>;
}

function catalogCard(input: CatalogCardInput): CryptoCard {
  const { feeModel, scoreBreakdown, overallScore, ...card } = input;
  const assessed =
    scoreBreakdown ??
    assessedScores(
      {
        cost: 15,
        cashback: 8,
        availability: 8,
        payment: 10,
        risk: 9,
        experience: 7,
        transparency: 4,
      },
      "依据公开官方资料作初步评估；卡片资格、地区、费率和限额应在申请前复核。",
    );

  return {
    issuer: "以官方卡片计划及当地合作发卡方为准",
    cardNetwork: ["Visa"],
    supportedRegions: ["以官方开放地区为准"],
    restrictedRegions: ["受制裁地区及官方限制地区"],
    applicationRegions: ["以官方申请入口显示的地区为准"],
    residencyRequirement: "通常需要位于官方支持地区，并完成账户与 KYC 审核。",
    mainlandChinaPassportSupport: "unknown",
    japanResidenceCardSupport: "unknown",
    hongKongIdSupport: "unknown",
    kycRequired: true,
    kycDocuments: ["身份证件", "自拍验证", "地址或资金来源资料可能被要求"],
    proofOfAddressRequired: "partial",
    virtualCardSupported: true,
    physicalCardSupported: false,
    metalCardSupported: false,
    applePaySupported: "unknown",
    googlePaySupported: "unknown",
    paypalSupported: "unknown",
    curveSupported: "unknown",
    supportedCurrencies: ["USDT", "USDC", "当地结算币种"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["链上转入", "账户余额"],
    openingFee: "以官方 App、费用页或卡片计划显示为准",
    monthlyFee: "以官方费用页为准",
    annualFee: "以官方费用页为准",
    topUpFee: "按入金方式、网络和地区而定",
    spendingFee: "以官方费用页和实际结算汇率为准",
    fxFee: "以官方费用页和卡组织汇率为准",
    atmWithdrawalFee: "如提供实体卡或 ATM 功能，以官方费用页为准",
    freeAtmLimit: "以官方费用页为准",
    cashbackCap: "按卡等级、活动及周期规则限制",
    cashbackCurrency: "按官方卡片计划或活动规则发放",
    cashbackCycle: "交易确认后，按官方卡片计划发放",
    cashbackRequirements: "需满足账户、地区、卡等级及活动资格。",
    singleTransactionLimit: "按地区、卡类型和 KYC 等级限制",
    monthlySpendingLimit: "按地区、卡类型和 KYC 等级限制",
    atmSingleLimit: "按实体卡、地区和 ATM 网络限制",
    atmMonthlyLimit: "按实体卡、地区和账户等级限制",
    riskLevel: "中",
    freezeRisk: "跨境、异常交易、KYC 复核或地区资格变化可能触发限制。",
    customerSupportRating: 3,
    suitableFor: ["能完成 KYC 的受支持地区用户"],
    notSuitableFor: ["无法完成 KYC 或未核验居住地资格的用户"],
    pros: ["可直接查看官方卡片计划", "稳定币或链上资产支付路径"],
    cons: ["不同地区版本差异明显", "费率和资格需在申请前复核"],
    summary: "基于官方公开资料的初步整理；申请前应在官方入口确认资格、费率和限额。",
    oneLine: "官方公开资料已整理，申请资格和费用须按地区核验。",
    bestFor: ["稳定币消费", "官方资料可查"],
    scenarios: ["线上消费", "跨境支付"],
    riskTags: ["地区资格需确认", "KYC 审查"],
    tags: ["虚拟卡", "稳定币", "KYC"],
    sourceStatus: "已以官方页面/官方帮助中心为主整理；未把第三方评测作为费用或申请资格依据。",
    lastUpdated: "2026-06-21",
    ...card,
    scoreBreakdown: assessed,
    overallScore: overallScore ?? total(assessed),
    feeModel: {
      spendingRatePct: 0,
      fxRatePct: 0,
      atmRatePct: 0,
      cashbackRatePct: 0,
      openingFeeUsd: 0,
      monthlyFeeUsd: 0,
      ...feeModel,
    },
  };
}

export const cards: CryptoCard[] = [
  {
    slug: "wirex-card",
    cardName: "Wirex Card",
    shortName: "Wirex",
    brandLogo: "WX",
    brandColor: "#2563EB",
    issuer: "Wirex 及合作发卡机构",
    cardNetwork: ["Visa", "Mastercard"],
    officialWebsite: "https://wirexapp.com/cards",
    supportedRegions: ["英国", "欧洲经济区", "亚太部分国家", "全球多地区"],
    restrictedRegions: ["美国等部分国家需单独确认", "受制裁地区"],
    applicationRegions: ["欧洲", "英国", "东南亚部分地区", "旅行用户"],
    residencyRequirement: "通常需要受支持国家/地区的居住身份和 KYC。",
    mainlandChinaPassportSupport: "partial",
    japanResidenceCardSupport: "partial",
    hongKongIdSupport: "partial",
    kycRequired: true,
    kycDocuments: ["身份证件", "自拍验证", "地址资料可能按地区要求"],
    proofOfAddressRequired: "partial",
    virtualCardSupported: true,
    physicalCardSupported: true,
    metalCardSupported: false,
    applePaySupported: "yes",
    googlePaySupported: "yes",
    paypalSupported: "partial",
    curveSupported: "partial",
    supportedCurrencies: ["USD", "EUR", "GBP", "多种法币", "BTC", "ETH"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["加密资产", "银行转账", "银行卡", "第三方支付通道"],
    openingFee: "虚拟卡通常无开卡费；实体卡费用按地区和计划确认",
    monthlyFee: "官方强调无月费，订阅计划权益另计",
    annualFee: "通常无年费",
    topUpFee: "按入金方式、网络和地区而定",
    spendingFee: "日常刷卡费用较低，需注意资产兑换价差",
    fxFee: "官方强调零外汇费用，适用范围需按地区确认",
    atmWithdrawalFee: "按地区、卡种和 ATM 网络收取",
    freeAtmLimit: "免费额度按计划和地区变化",
    cashbackRate: "最高约 8% X-Points，按计划和活动规则",
    cashbackCap: "按计划、等级和周期限制",
    cashbackCurrency: "X-Points / 平台权益积分",
    cashbackCycle: "通常按消费确认后发放",
    cashbackRequirements: "可能需要订阅计划、权益等级或符合活动条件",
    singleTransactionLimit: "按地区和 KYC 等级限制",
    monthlySpendingLimit: "按地区和 KYC 等级限制",
    atmSingleLimit: "按 ATM 网络和卡等级限制",
    atmMonthlyLimit: "按地区和账户等级限制",
    riskLevel: "中",
    freezeRisk: "跨境大额、资金来源不清或 KYC 资料变化可能触发审查。",
    customerSupportRating: 4,
    suitableFor: ["欧洲或旅行用户", "需要多币种消费的人", "希望使用实体卡和移动支付的人"],
    notSuitableFor: ["无法完成 KYC 的用户", "只想要免审虚拟卡的人", "不愿阅读权益计划的人"],
    pros: ["覆盖地区相对广", "多币种账户成熟", "移动支付支持较完整"],
    cons: ["返现和费用与计划绑定", "中国大陆/日本用户需逐项核验", "部分费用依赖地区页面"],
    summary:
      "Wirex 更像多币种钱包加银行卡组合，适合重视实体卡、移动支付和旅行消费的用户。",
    oneLine: "多币种钱包 + Visa/Mastercard 卡，适合欧洲和旅行场景。",
    bestFor: ["旅行消费", "实体卡", "多币种"],
    scenarios: ["旅行", "日常消费", "订阅服务", "跨境支付"],
    riskTags: ["权益规则变化", "地区差异", "KYC 审查"],
    tags: ["实体卡", "虚拟卡", "Apple Pay", "Google Pay", "旅行", "多币种"],
    sourceStatus: "示例数据，已附官方来源链接；费用与地区需上线前逐项复核。",
    lastUpdated: "2026-06-18",
    sourceLinks: [
      { label: "Wirex Card 官方页面", url: "https://wirexapp.com/cards" },
      { label: "Wirex 定价页面", url: "https://wirexapp.com/pricing" },
    ],
    scoreBreakdown: wirexScores,
    overallScore: total(wirexScores),
    feeModel: {
      spendingRatePct: 0.3,
      fxRatePct: 0,
      atmRatePct: 2,
      cashbackRatePct: 2,
      cashbackCapUsd: 80,
      openingFeeUsd: 0,
      monthlyFeeUsd: 0,
    },
  },
  {
    slug: "crypto-com-visa-card",
    cardName: "Crypto.com Visa Card",
    shortName: "Crypto.com",
    brandLogo: "CC",
    brandColor: "#111827",
    issuer: "Crypto.com 及合作发卡机构",
    cardNetwork: ["Visa"],
    officialWebsite: "https://crypto.com/cards",
    supportedRegions: ["美国", "加拿大", "英国", "欧洲经济区", "亚太部分国家"],
    restrictedRegions: ["受制裁地区", "未开放卡片服务的国家/地区"],
    applicationRegions: ["美国", "欧洲", "英国", "新加坡等亚太市场"],
    residencyRequirement: "通常需要所在地区支持 Crypto.com 卡片服务并完成 KYC。",
    mainlandChinaPassportSupport: "partial",
    japanResidenceCardSupport: "partial",
    hongKongIdSupport: "partial",
    kycRequired: true,
    kycDocuments: ["身份证件", "自拍验证", "地址证明可能按地区要求"],
    proofOfAddressRequired: "partial",
    virtualCardSupported: true,
    physicalCardSupported: true,
    metalCardSupported: true,
    applePaySupported: "partial",
    googlePaySupported: "partial",
    paypalSupported: "partial",
    curveSupported: "partial",
    supportedCurrencies: ["USD", "EUR", "GBP", "SGD", "多种法币", "BTC", "ETH"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["Crypto.com App 余额", "加密资产兑换", "银行卡", "银行转账"],
    openingFee: "虚拟卡通常免费；实体/金属卡和换卡费用按地区与等级",
    monthlyFee: "通常无月费，权益与等级/持仓相关",
    annualFee: "通常无年费",
    topUpFee: "按充值方式、资产和地区而定",
    spendingFee: "刷卡本身通常低费率，资产兑换和价差需计入",
    fxFee: "免费外汇额度和超额费率按等级与地区",
    atmWithdrawalFee: "免费 ATM 额度后收取费用",
    freeAtmLimit: "按卡等级变化",
    cashbackRate: "按卡等级和活动变化，通常为 0%-较高比例",
    cashbackCap: "按等级、周期和活动规则限制",
    cashbackCurrency: "CRO 或平台指定权益",
    cashbackCycle: "按交易确认后发放",
    cashbackRequirements: "可能需要持有/锁定平台币或达到权益等级",
    singleTransactionLimit: "按地区、卡等级和 KYC 限制",
    monthlySpendingLimit: "按地区、卡等级和 KYC 限制",
    atmSingleLimit: "按 ATM 网络和卡等级限制",
    atmMonthlyLimit: "按卡等级限制",
    riskLevel: "中",
    freezeRisk: "平台账户风控、KYC 复核、权益等级变化和地区政策变化会影响卡片使用。",
    customerSupportRating: 4,
    suitableFor: ["已有 Crypto.com 账户用户", "重视 Visa 实体卡的人", "愿意研究返现等级的人"],
    notSuitableFor: ["不愿持有平台资产的人", "需要稳定固定返现的人", "无法提供 KYC 资料的人"],
    pros: ["品牌认知度高", "卡片等级丰富", "实体卡和金属卡体验较完整"],
    cons: ["权益规则复杂", "不同地区差异大", "返现不应脱离持仓成本计算"],
    summary:
      "Crypto.com Visa Card 适合已有平台账户、愿意接受等级体系并希望获得实体卡体验的用户。",
    oneLine: "老牌 Visa 加密卡，权益丰富但需要理解等级和地区规则。",
    bestFor: ["实体卡", "返现权益", "平台生态"],
    scenarios: ["日常消费", "旅行", "线下刷卡", "订阅服务"],
    riskTags: ["权益变化", "平台币波动", "地区限制"],
    tags: ["Visa", "实体卡", "虚拟卡", "金属卡", "返现", "旅行"],
    sourceStatus: "示例数据，已附官方来源链接；卡等级和地区权益必须以官方页面为准。",
    lastUpdated: "2026-06-18",
    sourceLinks: [
      { label: "Crypto.com Visa Card 官方页面", url: "https://crypto.com/cards" },
      { label: "Crypto.com Card 帮助中心", url: "https://help.crypto.com/en/collections/260584-crypto-com-visa-card" },
    ],
    scoreBreakdown: cryptoComScores,
    overallScore: total(cryptoComScores),
    feeModel: {
      spendingRatePct: 0.4,
      fxRatePct: 0.5,
      atmRatePct: 2,
      cashbackRatePct: 1.5,
      cashbackCapUsd: 100,
      openingFeeUsd: 0,
      monthlyFeeUsd: 0,
    },
  },
  {
    slug: "bybit-card",
    cardName: "Bybit Card",
    shortName: "Bybit",
    brandLogo: "BY",
    brandColor: "#F59E0B",
    issuer: "Bybit 及合作发卡机构",
    cardNetwork: ["Mastercard"],
    officialWebsite: "https://www.bybit.com/en/cards/",
    supportedRegions: ["亚太部分地区", "澳大利亚", "巴西", "阿根廷", "墨西哥", "秘鲁", "哈萨克斯坦部分地区"],
    restrictedRegions: ["欧洲经济区", "美国", "受制裁地区", "未开放卡片服务地区"],
    applicationRegions: ["亚太部分地区", "拉美部分地区", "澳大利亚"],
    residencyRequirement: "需要 Bybit 账户 KYC，并且账号所属地区开放卡服务。",
    mainlandChinaPassportSupport: "partial",
    japanResidenceCardSupport: "partial",
    hongKongIdSupport: "partial",
    kycRequired: true,
    kycDocuments: ["身份证件", "自拍验证", "居住地资料可能按地区要求"],
    proofOfAddressRequired: "partial",
    virtualCardSupported: true,
    physicalCardSupported: true,
    metalCardSupported: false,
    applePaySupported: "partial",
    googlePaySupported: "partial",
    paypalSupported: "partial",
    curveSupported: "unknown",
    supportedCurrencies: ["USDT", "USDC", "BTC", "ETH", "XRP", "EUR", "GBP", "USD"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["Bybit 资金账户", "加密资产自动兑换", "法币余额"],
    openingFee: "虚拟卡通常免费；亚太部分地区实体卡约 5 USD/USDT",
    monthlyFee: "通常无月费",
    annualFee: "通常无年费",
    topUpFee: "资金账户内资产划转通常无直接充值费，链上入金另计网络费",
    spendingFee: "加密资产消费自动兑换通常约 0.9%",
    fxFee: "跨币种消费和 Mastercard 汇率附加费用按地区，常见约 1%-2%",
    atmWithdrawalFee: "免费额度后常见约 2%",
    freeAtmLimit: "部分地区每月约 100 USD 等值免费额度",
    cashbackRate: "活动/等级最高约 2%-10%，以官方活动为准",
    cashbackCap: "按活动、等级和周期限制",
    cashbackCurrency: "Bybit 积分、USDT 或活动指定资产",
    cashbackCycle: "按交易确认和活动周期发放",
    cashbackRequirements: "可能需要账户等级、任务、消费门槛或活动报名",
    singleTransactionLimit: "按地区、卡类型和账户等级限制",
    monthlySpendingLimit: "按地区、卡类型和账户等级限制",
    atmSingleLimit: "按地区和 ATM 网络限制",
    atmMonthlyLimit: "按地区和账户等级限制",
    riskLevel: "中高",
    freezeRisk: "交易所账户风控会直接影响卡片；资金来源、KYC 地区和高频消费需谨慎。",
    customerSupportRating: 4,
    suitableFor: ["已有 Bybit 账户用户", "希望用 USDT/USDC 日常消费的人", "能接受交易所风控规则的人"],
    notSuitableFor: ["不愿把消费卡和交易所账户绑定的人", "高频大额异常交易用户", "需要欧洲卡的人"],
    pros: ["稳定币消费路径直接", "返现活动较多", "虚拟卡开通较快"],
    cons: ["地区可用性变化快", "交易所账户风控影响大", "费用和权益活动化明显"],
    summary:
      "Bybit Card 适合已有 Bybit 账户、希望把稳定币余额用于日常消费的人，但地区和风控要求需要重点核验。",
    oneLine: "交易所生态内的 Mastercard，适合已有 Bybit 和稳定币用户。",
    bestFor: ["稳定币消费", "活动返现", "虚拟卡"],
    scenarios: ["日常消费", "线上订阅", "跨境支付", "旅行"],
    riskTags: ["风控较强", "地区变化", "交易所账户绑定"],
    tags: ["Mastercard", "虚拟卡", "实体卡", "USDT", "USDC", "高返现", "Apple Pay"],
    sourceStatus: "示例数据，已附官方来源链接；Bybit 按地区分版本，必须以账号内页面为准。",
    lastUpdated: "2026-06-18",
    sourceLinks: [
      { label: "Bybit Card 官方页面", url: "https://www.bybit.com/en/cards/" },
      {
        label: "Bybit Card 费用与限额",
        url: "https://www.bybit.com/en/help-center/article/Fees-and-Spending-Limits-Bybit-Card",
      },
      {
        label: "Bybit Card 支持国家/地区",
        url: "https://www.bybit.com/en/help-center/article/Supported-Countries-for-Bybit-Card",
      },
    ],
    scoreBreakdown: bybitScores,
    overallScore: total(bybitScores),
    feeModel: {
      spendingRatePct: 0.9,
      fxRatePct: 1,
      atmRatePct: 2,
      cashbackRatePct: 2,
      cashbackCapUsd: 60,
      openingFeeUsd: 0,
      monthlyFeeUsd: 0,
    },
  },
  {
    slug: "nexo-card",
    cardName: "Nexo Card",
    shortName: "Nexo",
    brandLogo: "NX",
    brandColor: "#22C55E",
    issuer: "Nexo 及合作发卡机构",
    cardNetwork: ["Mastercard"],
    officialWebsite: "https://nexo.com/card",
    supportedRegions: ["欧洲经济区", "英国等部分市场需确认"],
    restrictedRegions: ["美国", "受制裁地区", "未开放 Nexo Card 的国家/地区"],
    applicationRegions: ["欧洲", "欧洲经济区居民"],
    residencyRequirement: "通常需要受支持欧洲地区居住身份和 Nexo 账户 KYC。",
    mainlandChinaPassportSupport: "no",
    japanResidenceCardSupport: "no",
    hongKongIdSupport: "no",
    kycRequired: true,
    kycDocuments: ["身份证件", "自拍验证", "地址资料", "资金来源资料可能被要求"],
    proofOfAddressRequired: "partial",
    virtualCardSupported: true,
    physicalCardSupported: true,
    metalCardSupported: false,
    applePaySupported: "yes",
    googlePaySupported: "yes",
    paypalSupported: "partial",
    curveSupported: "partial",
    supportedCurrencies: ["EUR", "GBP", "USD", "BTC", "ETH", "NEXO"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["Nexo 账户余额", "加密资产抵押额度", "银行转账"],
    openingFee: "通常无开卡费，实体卡发放条件按地区和等级",
    monthlyFee: "通常无月费",
    annualFee: "通常无年费",
    topUpFee: "按银行通道或加密资产网络费用",
    spendingFee: "借记模式和信用模式成本不同，需按模式计算",
    fxFee: "免费额度和超额费用按等级/地区",
    atmWithdrawalFee: "免费取现次数或额度后收取费用",
    freeAtmLimit: "按账户等级变化",
    cashbackRate: "最高约 2%，按等级和支付模式",
    cashbackCap: "按账户等级和权益规则",
    cashbackCurrency: "NEXO 或 BTC 等指定资产",
    cashbackCycle: "交易确认后发放",
    cashbackRequirements: "通常与忠诚度等级、资产持有和卡模式相关",
    singleTransactionLimit: "按账户等级和地区限制",
    monthlySpendingLimit: "按账户等级和地区限制",
    atmSingleLimit: "按 ATM 网络和账户等级",
    atmMonthlyLimit: "按账户等级限制",
    riskLevel: "中",
    freezeRisk: "抵押资产价格波动、额度变化、KYC 复核和借贷规则会影响可用额度。",
    customerSupportRating: 4,
    suitableFor: ["欧洲居民", "已有 Nexo 资产用户", "理解借记/信用双模式的人"],
    notSuitableFor: ["非欧洲用户", "不愿接触借贷和抵押的人", "只想要简单预付卡的人"],
    pros: ["借记/信用模式灵活", "移动支付支持完整", "适合已有 Nexo 生态用户"],
    cons: ["模式理解成本高", "地区覆盖有限", "抵押资产波动会影响体验"],
    summary:
      "Nexo Card 适合欧洲地区、已有 Nexo 资产并理解抵押额度逻辑的用户。",
    oneLine: "欧洲友好的 Mastercard，主打借记/信用双模式和移动支付。",
    bestFor: ["欧洲用户", "移动支付", "已有 Nexo 用户"],
    scenarios: ["日常消费", "旅行", "线下刷卡"],
    riskTags: ["抵押资产波动", "地区限制", "KYC 审查"],
    tags: ["Mastercard", "实体卡", "虚拟卡", "Apple Pay", "Google Pay", "欧洲"],
    sourceStatus: "示例数据，已附官方来源链接；借记/信用模式需按官方最新条款核验。",
    lastUpdated: "2026-06-18",
    sourceLinks: [
      { label: "Nexo Card 官方页面", url: "https://nexo.com/card" },
      { label: "Nexo Card 帮助中心", url: "https://support.nexo.com/s/topic/0TO5p000000YhgmGAC/nexo-card" },
    ],
    scoreBreakdown: nexoScores,
    overallScore: total(nexoScores),
    feeModel: {
      spendingRatePct: 0.4,
      fxRatePct: 0.5,
      atmRatePct: 2,
      cashbackRatePct: 2,
      cashbackCapUsd: 80,
      openingFeeUsd: 0,
      monthlyFeeUsd: 0,
    },
  },
  {
    slug: "coinbase-card",
    cardName: "Coinbase Card",
    shortName: "Coinbase",
    brandLogo: "CB",
    brandColor: "#0052FF",
    issuer: "Coinbase 及合作发卡机构",
    cardNetwork: ["Visa"],
    officialWebsite: "https://www.coinbase.com/card",
    supportedRegions: ["美国"],
    restrictedRegions: ["非美国用户", "受制裁地区", "未开放 Coinbase Card 的州或地区"],
    applicationRegions: ["美国居民"],
    residencyRequirement: "通常需要美国 Coinbase 账户、美国居住身份和 KYC。",
    mainlandChinaPassportSupport: "no",
    japanResidenceCardSupport: "no",
    hongKongIdSupport: "no",
    kycRequired: true,
    kycDocuments: ["美国身份资料", "SSN/税务相关资料", "地址资料"],
    proofOfAddressRequired: "yes",
    virtualCardSupported: true,
    physicalCardSupported: true,
    metalCardSupported: false,
    applePaySupported: "yes",
    googlePaySupported: "yes",
    paypalSupported: "partial",
    curveSupported: "no",
    supportedCurrencies: ["USD", "USDC", "BTC", "ETH", "Coinbase 支持资产"],
    supportedStablecoins: ["USDC"],
    topUpMethods: ["Coinbase 余额", "银行账户", "工资入金", "加密资产出售"],
    openingFee: "通常无开卡费",
    monthlyFee: "通常无月费",
    annualFee: "通常无年费",
    topUpFee: "按 Coinbase 入金和交易规则",
    spendingFee: "官方强调无 Coinbase 消费手续费，资产兑换价差另计",
    fxFee: "国际消费和网络汇率按条款",
    atmWithdrawalFee: "ATM 运营商和网络费用可能适用",
    freeAtmLimit: "以官方卡条款为准",
    cashbackRate: "活动期权益变化，不应假设长期固定返现",
    cashbackCap: "按活动规则",
    cashbackCurrency: "USDC 或活动指定资产",
    cashbackCycle: "按交易确认后发放",
    cashbackRequirements: "需美国 Coinbase Card 资格，权益按活动规则",
    singleTransactionLimit: "按 Coinbase Card 条款和账户等级",
    monthlySpendingLimit: "按 Coinbase Card 条款和账户等级",
    atmSingleLimit: "按 ATM 网络和账户限制",
    atmMonthlyLimit: "按账户限制",
    riskLevel: "中低",
    freezeRisk: "美国合规审查、税务事件、资产出售和异常交易可能触发限制。",
    customerSupportRating: 4,
    suitableFor: ["美国居民", "已有 Coinbase 用户", "希望用 USDC/USD 消费的人"],
    notSuitableFor: ["日本/香港/欧洲非美国用户", "中国大陆用户", "不想触发加密资产出售税务事件的人"],
    pros: ["美国合规路径清晰", "消费费率说明直接", "Coinbase 生态体验简单"],
    cons: ["地区覆盖窄", "返现不稳定", "加密资产消费可能涉及税务记录"],
    summary:
      "Coinbase Card 对美国用户较清晰，对中文用户的主要价值是作为美国地区样本，不适合跨地区申请。",
    oneLine: "美国用户向 Visa 卡，费用透明但地区覆盖很窄。",
    bestFor: ["美国用户", "Coinbase 用户", "USDC 消费"],
    scenarios: ["日常消费", "线上订阅", "美国本地刷卡"],
    riskTags: ["美国限定", "税务记录", "返现活动变化"],
    tags: ["Visa", "虚拟卡", "实体卡", "Apple Pay", "Google Pay", "美国"],
    sourceStatus: "示例数据，已附官方来源链接；美国州/账户资格需以官方页面为准。",
    lastUpdated: "2026-06-18",
    sourceLinks: [
      { label: "Coinbase Card 官方页面", url: "https://www.coinbase.com/card" },
      { label: "Coinbase Card 支持页面", url: "https://help.coinbase.com/en/coinbase/trading-and-funding/coinbase-card" },
    ],
    scoreBreakdown: coinbaseScores,
    overallScore: total(coinbaseScores),
    feeModel: {
      spendingRatePct: 0,
      fxRatePct: 0.5,
      atmRatePct: 2,
      cashbackRatePct: 0.5,
      cashbackCapUsd: 30,
      openingFeeUsd: 0,
      monthlyFeeUsd: 0,
    },
  },
  {
    slug: "redotpay-card",
    cardName: "RedotPay Card",
    shortName: "RedotPay",
    brandLogo: "RP",
    brandColor: "#EF4444",
    issuer: "RedotPay 及合作发卡机构",
    cardNetwork: ["Visa"],
    officialWebsite: "https://www.redotpay.com/card/",
    supportedRegions: ["全球多地区", "亚洲用户常见", "欧洲/美洲部分地区需确认"],
    restrictedRegions: ["受制裁地区", "官方禁用国家/地区", "未开放 KYC 地区"],
    applicationRegions: ["亚洲部分地区", "跨境消费用户", "稳定币用户"],
    residencyRequirement: "需要 RedotPay 账户 KYC，申请资格按居住地和证件审核。",
    mainlandChinaPassportSupport: "partial",
    japanResidenceCardSupport: "partial",
    hongKongIdSupport: "partial",
    kycRequired: true,
    kycDocuments: ["身份证件", "自拍验证", "地址资料可能被要求"],
    proofOfAddressRequired: "partial",
    virtualCardSupported: true,
    physicalCardSupported: true,
    metalCardSupported: false,
    applePaySupported: "yes",
    googlePaySupported: "partial",
    paypalSupported: "partial",
    curveSupported: "unknown",
    supportedCurrencies: ["USDT", "USDC", "BTC", "ETH", "法币消费币种"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["链上充值", "平台余额", "稳定币"],
    openingFee: "虚拟卡/实体卡开卡费按 App 和官方费用页显示",
    monthlyFee: "通常无固定月费或按卡种规则",
    annualFee: "按卡种和活动规则",
    topUpFee: "链上网络费和平台入金规则",
    spendingFee: "按卡种和地区，需以官方费用页为准",
    fxFee: "跨币种消费和网络汇率费用按条款",
    atmWithdrawalFee: "实体卡 ATM 取现按费用页和 ATM 网络收取",
    freeAtmLimit: "以官方费用页为准",
    cashbackRate: "非主打固定返现，活动权益按官方说明",
    cashbackCap: "按活动规则",
    cashbackCurrency: "活动指定资产或积分",
    cashbackCycle: "按活动规则",
    cashbackRequirements: "需满足活动、账户和卡片规则",
    singleTransactionLimit: "按卡种、地区和 KYC 等级",
    monthlySpendingLimit: "按卡种、地区和 KYC 等级",
    atmSingleLimit: "按实体卡和 ATM 网络限制",
    atmMonthlyLimit: "按账户等级限制",
    riskLevel: "中高",
    freezeRisk: "稳定币链上入金、跨境交易和异常消费会提高 KYC 复核或冻结风险。",
    customerSupportRating: 3,
    suitableFor: ["已有稳定币资产的人", "需要虚拟卡订阅服务的人", "希望尝试 Apple Pay 的跨境用户"],
    notSuitableFor: ["无法完成 KYC 的用户", "需要高透明固定费用的人", "高频大额广告投放用户"],
    pros: ["稳定币路径直接", "虚拟卡和实体卡选择清晰", "Apple Pay 是明显卖点"],
    cons: ["费用需按 App 实时确认", "风控和地区规则变化快", "返现不是核心优势"],
    summary:
      "RedotPay Card 更偏稳定币预付卡体验，适合需要虚拟卡或移动支付的用户，但费用透明度和风控需重点留意。",
    oneLine: "稳定币导向的 Visa 卡，适合虚拟卡、Apple Pay 和跨境消费试用。",
    bestFor: ["USDT/USDC", "虚拟卡", "Apple Pay"],
    scenarios: ["订阅服务", "日常消费", "跨境支付", "旅行"],
    riskTags: ["风控较强", "费用需复核", "KYC 审查"],
    tags: ["Visa", "虚拟卡", "实体卡", "USDT", "USDC", "Apple Pay", "稳定币"],
    sourceStatus: "示例数据，已附官方来源链接；费用和限额应以上线当天官方费用页为准。",
    lastUpdated: "2026-06-18",
    sourceLinks: [
      { label: "RedotPay Card 官方页面", url: "https://www.redotpay.com/card/" },
      {
        label: "RedotPay Card 限额与费用",
        url: "https://helpcenter.redotpay.com/en/articles/10339271-redotpay-card-limitations-fees",
      },
    ],
    scoreBreakdown: redotScores,
    overallScore: total(redotScores),
    feeModel: {
      spendingRatePct: 1,
      fxRatePct: 1,
      atmRatePct: 2,
      cashbackRatePct: 0,
      cashbackCapUsd: 0,
      openingFeeUsd: 10,
      monthlyFeeUsd: 0,
    },
  },
  catalogCard({
    slug: "tria-card",
    cardName: "Tria Card",
    shortName: "Tria",
    brandLogo: "TR",
    brandColor: "#6D5CFF",
    issuer: "Tria（Visa 发卡合作方以官方卡片计划为准）",
    cardNetwork: ["Visa"],
    officialWebsite: "https://www.tria.so/",
    supportedRegions: ["官方白皮书称覆盖 150+ 国家/地区"],
    restrictedRegions: ["官方限制地区", "受制裁地区"],
    applicationRegions: ["需在 Tria App/官网卡片入口核验"],
    residencyRequirement: "受支持地区用户，具体居住地与证件要求以申请时页面为准。",
    physicalCardSupported: true,
    supportedCurrencies: ["1000+ 链上资产（官方白皮书口径）", "USDT", "USDC"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["Tria 自托管钱包余额", "链上资产"],
    openingFee: "虚拟/实体卡与卡等级费用以 App 内报价为准",
    monthlyFee: "按卡等级和官方计划确认",
    annualFee: "按卡等级和官方计划确认",
    spendingFee: "按官方卡片计划和结算路径确认",
    cashbackRate: "最高 6% 返现（卡等级决定；超过月度上限后降至 1%/0.5%）",
    cashbackCap: "虚拟卡每月最高 100 USD；Signature 1,000 USD；Premium 2,000 USD（官方条款）",
    cashbackCurrency: "按官方卡片返现条款发放至已连接钱包",
    cashbackRequirements: "返现比例及上限取决于 Virtual、Signature 或 Premium 卡等级。",
    riskLevel: "中",
    freezeRisk: "自托管资产支付仍受卡计划 KYC、地区与交易合规审核约束。",
    customerSupportRating: 3,
    suitableFor: ["需要多链资产消费的人", "能接受按卡等级计算返现的人"],
    notSuitableFor: ["需要固定无上限返现的人", "未确认所在地区资格的人"],
    pros: ["官方称支持 1000+ 资产、100+ 链", "虚拟与实体卡均有计划", "高等级返现明确披露"],
    cons: ["返现上限后比例下降", "具体地区和费用应在 App 核验"],
    summary: "Tria 以自托管钱包支付和多链资产为特点；返现随卡等级变化，不能只看 6% 的宣传上限。",
    oneLine: "多链自托管 Visa 卡，最高 6% 返现但有等级与月度上限。",
    bestFor: ["多链资产", "返现等级", "自托管钱包"],
    scenarios: ["线上消费", "日常消费", "跨境支付"],
    riskTags: ["返现有上限", "地区资格需确认", "KYC 审查"],
    tags: ["Visa", "虚拟卡", "实体卡", "多链", "最高 6% 返现"],
    sourceLinks: [
      { label: "Tria 官方网站", url: "https://www.tria.so/" },
      { label: "Tria Card 返现条款", url: "https://docs.tria.so/card-cashback-terms" },
      { label: "Tria 官方白皮书", url: "https://www.tria.so/legal/whitepaper" },
    ],
    scoreBreakdown: assessedScores(
      { cost: 17, cashback: 12, availability: 11, payment: 12, risk: 9, experience: 7, transparency: 4 },
      "返现规则由官方条款明确披露；费用、地区和实际结算路径仍需在申请前核验。",
    ),
    feeModel: { cashbackRatePct: 1.5, openingFeeUsd: 0 },
  }),
  catalogCard({
    slug: "plasma-one-card",
    cardName: "Plasma One",
    shortName: "Plasma",
    brandLogo: "PL",
    brandColor: "#00BFA5",
    issuer: "Signify Holdings（Plasma One 美国卡条款所列；地区版本可能不同）",
    cardNetwork: ["Visa"],
    officialWebsite: "https://www.plasma.to/one",
    supportedRegions: ["官方宣传称 150+ 国家/地区"],
    restrictedRegions: ["受制裁地区", "未开放地区", "美国以外条款需单独核验"],
    applicationRegions: ["官网早期访问/候补名单地区"],
    residencyRequirement: "需要完成官方快速 KYC；不同国家/地区的资格应在申请入口确认。",
    virtualCardSupported: true,
    physicalCardSupported: true,
    applePaySupported: "yes",
    googlePaySupported: "yes",
    supportedCurrencies: ["稳定币余额", "USDT", "USDC"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["Plasma 稳定币余额", "链上转入"],
    openingFee: "虚拟卡可在 App 内开通；实体卡费用以 App 显示为准",
    monthlyFee: "官方美国卡条款未列月费",
    annualFee: "官方美国卡条款列为无年费",
    spendingFee: "以申请地区的官方费用/条款为准",
    fxFee: "美国卡条款列跨境交易费 1%；其他地区以当地版本为准",
    cashbackRate: "最高 3% XPL 返现（早期访问、活动和地区资格需确认）",
    cashbackCap: "按官方活动和卡片计划限制",
    cashbackCurrency: "XPL",
    cashbackRequirements: "需要符合 Plasma One 卡计划、地区与活动资格。",
    riskLevel: "中高",
    freezeRisk: "产品仍处早期访问阶段，合作方、资格与条款更新可能影响可用性。",
    customerSupportRating: 3,
    suitableFor: ["已有稳定币余额并愿意等待开通的人", "重视移动支付的人"],
    notSuitableFor: ["需要立即确保开卡的人", "不接受早期访问产品的人"],
    pros: ["官方称可即时获得虚拟卡", "支持实体卡和 Apple Pay/Google Pay", "美国卡条款明确无年费"],
    cons: ["当前有早期访问属性", "跨境费和地区条款需分别确认"],
    summary: "Plasma One 主打稳定币余额、即时虚拟卡和最高 3% XPL 返现，但当前开通资格和当地条款需要优先确认。",
    oneLine: "稳定币 Visa 卡，最高 3% XPL 返现，当前应先确认早期访问资格。",
    bestFor: ["稳定币消费", "Apple Pay", "早期访问用户"],
    scenarios: ["日常消费", "线上订阅", "移动支付"],
    riskTags: ["早期访问", "地区资格需确认", "条款更新"],
    tags: ["Visa", "虚拟卡", "实体卡", "Apple Pay", "Google Pay", "最高 3% 返现"],
    sourceLinks: [
      { label: "Plasma One 官方页面", url: "https://www.plasma.to/one" },
      { label: "Plasma One 美国卡条款", url: "https://www.plasma.to/plasma-one-us-card-terms" },
    ],
    scoreBreakdown: assessedScores(
      { cost: 18, cashback: 11, availability: 10, payment: 13, risk: 8, experience: 7, transparency: 4 },
      "官方页面披露移动支付、返现及美国条款；早期访问和地区版本降低了可申请性评分。",
    ),
    feeModel: { fxRatePct: 1, cashbackRatePct: 3, openingFeeUsd: 0, monthlyFeeUsd: 0 },
  }),
  catalogCard({
    slug: "etherfi-cash-card",
    cardName: "ether.fi Cash Card",
    shortName: "ether.fi",
    brandLogo: "EF",
    brandColor: "#7C3AED",
    issuer: "ether.fi Cash 及合作发卡机构",
    cardNetwork: ["Visa"],
    officialWebsite: "https://www.ether.fi/cash",
    supportedRegions: ["官方 Cash 页面与帮助中心列出的合资格国家/地区"],
    restrictedRegions: ["未开放 Cash 的国家/地区", "受制裁地区"],
    applicationRegions: ["需以 ether.fi App 内资格及实体卡配送地区为准"],
    residencyRequirement: "实体卡需要完成 KYC；服务资格和配送国家以 Cash 帮助中心为准。",
    virtualCardSupported: true,
    physicalCardSupported: true,
    metalCardSupported: true,
    applePaySupported: "yes",
    googlePaySupported: "yes",
    supportedCurrencies: ["USD", "EUR", "eUSD", "USDC"],
    supportedStablecoins: ["USDC", "eUSD"],
    topUpMethods: ["ether.fi Cash 余额", "链上资产", "账户结算余额"],
    openingFee: "首次合资格实体卡按会员层级；Core 实体卡要求 40 USD 可退还保证金",
    monthlyFee: "按 Cash 会员层级/权益计划确认",
    annualFee: "按 Cash 会员层级/权益计划确认",
    spendingFee: "以 Cash 卡片条款为准",
    fxFee: "EUR/USD 消费 0%；其他币种 1%（官方 Cash 页面）",
    atmWithdrawalFee: "2%（官方 Cash 页面）",
    cashbackRate: "最高 3% 返现（Cash 等级和月度额度决定）",
    cashbackCap: "3% 返现月度消费额度按等级为约 2,000 / 10,000 / 50,000 USD",
    cashbackCurrency: "按 Cash 计划指定的返现资产",
    cashbackRequirements: "由 Cash 会员等级和当月合资格消费额度决定。",
    riskLevel: "中",
    freezeRisk: "卡片服务资格、KYC、Cash 会员计划和链上结算状态均可能影响可用额度。",
    customerSupportRating: 4,
    suitableFor: ["需要 Apple Pay/Google Pay 的稳定币用户", "能理解会员等级和额度的人"],
    notSuitableFor: ["不希望支付或维持会员计划的人", "未完成 KYC 的用户"],
    pros: ["官方披露返现上限与费用", "虚拟、实体和金属卡层级", "EUR/USD 外汇费为 0%"],
    cons: ["返现与会员等级绑定", "实体卡资格和配送地区有限"],
    summary: "ether.fi Cash 是带会员等级的 Visa 支付卡，返现、实体卡材质和月度额度均与层级绑定。",
    oneLine: "最高 3% 返现的 Cash Visa 卡，移动支付完整，需看会员等级和额度。",
    bestFor: ["移动支付", "旅行消费", "Cash 会员"],
    scenarios: ["日常消费", "旅行", "线上订阅", "ATM"],
    riskTags: ["返现有上限", "会员等级", "KYC 审查"],
    tags: ["Visa", "虚拟卡", "实体卡", "金属卡", "Apple Pay", "最高 3% 返现"],
    sourceLinks: [
      { label: "ether.fi Cash 官方页面", url: "https://www.ether.fi/cash" },
      { label: "ether.fi Cash Card 官方入口", url: "https://www.ether.fi/app/cash/card" },
      { label: "ether.fi 实体卡与 KYC 帮助", url: "https://help.ether.fi/es/articles/376356-how-do-i-get-a-physical-card" },
    ],
    scoreBreakdown: assessedScores(
      { cost: 20, cashback: 12, availability: 9, payment: 14, risk: 11, experience: 8, transparency: 5 },
      "官方 Cash 页面明确披露返现、外汇及 ATM 费用；实体卡资格仍受 KYC 和地区限制。",
    ),
    feeModel: { fxRatePct: 1, atmRatePct: 2, cashbackRatePct: 3, openingFeeUsd: 0 },
  }),
  catalogCard({
    slug: "bitget-card",
    cardName: "Bitget Card",
    shortName: "Bitget",
    brandLogo: "BG",
    brandColor: "#10B981",
    issuer: "Bitget Wallet / Bitget Card 合作发卡机构",
    cardNetwork: ["Visa"],
    officialWebsite: "https://www.bitget.com/card",
    supportedRegions: ["以 Bitget Card 支持中心列出的地区版本为准"],
    restrictedRegions: ["未开放地区", "受制裁地区", "不满足当地居住地资格的地区"],
    applicationRegions: ["Bitget Wallet/Card 已开放的地区"],
    residencyRequirement: "需要成年、位于支持地区、持有 Bitget Wallet，并完成官方 KYC。",
    virtualCardSupported: true,
    physicalCardSupported: true,
    supportedCurrencies: ["USDT"],
    supportedStablecoins: ["USDT"],
    topUpMethods: ["Bitget Wallet 余额", "USDT OTC 账户", "链上转入"],
    openingFee: "首张虚拟卡及实体卡按官方说明可免费；后续/地区版本以 App 为准",
    monthlyFee: "连续 12 个月未使用时，官方费用页列 1 USD/月不活跃费",
    annualFee: "官方费用页列无年费",
    spendingFee: "0.9%（官方费用页；地区版可能不同）",
    fxFee: "Visa 汇率之外另加 1%（官方费用页；地区版可能不同）",
    atmWithdrawalFee: "0.65 USD + 2%（官方费用页；地区版可能不同）",
    cashbackRate: "最高 12% BGB 返现（APAC VIP 活动；普通用户 2%，分级上限）",
    cashbackCap: "APAC 活动上限随 VIP 等级约为 5–800 USD/月",
    cashbackCurrency: "BGB",
    cashbackRequirements: "需符合 APAC 活动地区与 Bitget VIP 等级；不同地区权益可能不同。",
    riskLevel: "中高",
    freezeRisk: "钱包账户、KYC、资金来源与高风险交易都会影响卡片消费资格。",
    customerSupportRating: 4,
    suitableFor: ["已有 Bitget Wallet 的 USDT 用户", "符合 APAC VIP 活动资格的人"],
    notSuitableFor: ["不想绑定 Bitget Wallet 的人", "需要固定全球返现的人"],
    pros: ["USDT 消费路径直连", "官方明确公开部分费率", "APAC VIP 返现较高"],
    cons: ["返现强依赖地区和 VIP", "不活跃费和消费费需计入成本"],
    summary: "Bitget Card 的核心是钱包内 USDT 消费；最高 12% BGB 返现只适用于特定 APAC VIP 活动，不应视作通用返现。",
    oneLine: "USDT 消费 Visa 卡，APAC VIP 最高 12% BGB 返现，费率按地区核验。",
    bestFor: ["USDT", "Bitget Wallet", "APAC VIP 返现"],
    scenarios: ["日常消费", "线上订阅", "跨境支付", "ATM"],
    riskTags: ["VIP/地区限制", "钱包账户绑定", "不活跃费"],
    tags: ["Visa", "虚拟卡", "实体卡", "USDT", "最高 12% 返现", "Bitget Wallet"],
    sourceLinks: [
      { label: "Bitget Card 官方页面", url: "https://www.bitget.com/card" },
      { label: "Bitget Card 费用与限额", url: "https://www.bitget.com/en-CA/support/articles/12560603803519" },
      { label: "Bitget Card APAC 返现规则", url: "https://www.bitget.com/en-CA/support/articles/12560603881037" },
      { label: "Bitget Card 申请资格", url: "https://www.bitget.com/support/articles/12560603799842" },
    ],
    scoreBreakdown: assessedScores(
      { cost: 18, cashback: 13, availability: 10, payment: 13, risk: 9, experience: 8, transparency: 5 },
      "官方支持中心披露消费、外汇、ATM 和 APAC 返现规则；权益因地区/VIP 差异较大。",
    ),
    feeModel: { spendingRatePct: 0.9, fxRatePct: 1, atmRatePct: 2, cashbackRatePct: 2, monthlyFeeUsd: 0 },
  }),
  catalogCard({
    slug: "safepal-fiat24-mastercard",
    cardName: "SafePal × Fiat24 Mastercard",
    shortName: "SafePal",
    brandLogo: "SP",
    brandColor: "#4F46E5",
    issuer: "Fiat24（SafePal CeDeFi Banking gateway 合作方）",
    cardNetwork: ["Mastercard"],
    officialWebsite: "https://safepal.com/en/blog/limited-edition-mastercard",
    supportedRegions: ["需以 Fiat24 / SafePal 银行通道的实时支持地区为准"],
    restrictedRegions: ["Fiat24 未开放地区", "受制裁地区"],
    applicationRegions: ["可开通 SafePal × Fiat24 银行通道的地区"],
    residencyRequirement: "需要通过 Fiat24 账户审核；实际支持的居住地以开通流程为准。",
    virtualCardSupported: false,
    physicalCardSupported: true,
    supportedCurrencies: ["瑞士 IBAN 账户余额", "EUR", "CHF", "法币/加密入金"],
    supportedStablecoins: ["以 Fiat24 入金支持资产为准"],
    topUpMethods: ["加密资产", "Swiss IBAN 银行转账"],
    openingFee: "以 SafePal/Fiat24 开通流程和卡片设计活动页面为准",
    monthlyFee: "官方 SafePal 页面称银行通道无管理费；卡片费用仍应以 Fiat24 条款为准",
    annualFee: "以 Fiat24 卡片条款为准",
    spendingFee: "通过 Fiat24 Mastercard 结算，以合作方最新费用页为准",
    cashbackRate: "官方未披露固定返现；主要为 Swiss IBAN + Mastercard 消费服务",
    cashbackCap: "不适用（未见官方固定返现披露）",
    cashbackRequirements: "不适用（未见官方固定返现披露）",
    riskLevel: "中",
    freezeRisk: "银行通道由 Fiat24 提供，开户、KYC 和服务地区变化会影响可用性。",
    customerSupportRating: 3,
    suitableFor: ["需要 Swiss IBAN 与 Mastercard 组合的人", "已使用 SafePal 生态并能完成 Fiat24 审核的人"],
    notSuitableFor: ["只为高返现而申请的人", "未确认 Fiat24 所在地区支持的人"],
    pros: ["官方确认 SafePal 与 Fiat24 的 Mastercard 合作", "可通过加密资产或 IBAN 入金", "官方称银行通道无管理及入金费"],
    cons: ["费用和地区依赖 Fiat24", "官方未披露固定返现"],
    summary: "SafePal 的卡片服务实际由 Fiat24 银行通道承接，适合先确认 Swiss IBAN 开户资格和当地费用的用户。",
    oneLine: "SafePal 与 Fiat24 合作的 Mastercard，主打 Swiss IBAN，不是固定返现卡。",
    bestFor: ["Swiss IBAN", "加密入金", "SafePal 生态"],
    scenarios: ["日常消费", "银行转账", "跨境支付"],
    riskTags: ["合作方资格", "地区资格需确认", "无固定返现"],
    tags: ["Mastercard", "Swiss IBAN", "Fiat24", "加密入金"],
    sourceLinks: [
      { label: "SafePal × Fiat24 Mastercard 官方公告", url: "https://safepal.com/en/blog/limited-edition-mastercard" },
      { label: "SafePal 官方产品页", url: "https://www.safepal.com/en/?lang=en" },
    ],
    scoreBreakdown: assessedScores(
      { cost: 20, cashback: 6, availability: 9, payment: 12, risk: 11, experience: 7, transparency: 4 },
      "官方披露了合作模式及银行通道的零管理/入金费；卡费与覆盖地区仍需转到 Fiat24 条款核验。",
    ),
    feeModel: { cashbackRatePct: 0, openingFeeUsd: 0, monthlyFeeUsd: 0 },
  }),
  catalogCard({
    slug: "metamask-card",
    cardName: "MetaMask Card",
    shortName: "MetaMask",
    brandLogo: "MM",
    brandColor: "#F6851B",
    issuer: "MetaMask Card 合作发卡机构",
    cardNetwork: ["Mastercard"],
    officialWebsite: "https://metamask.io/card",
    supportedRegions: ["英国、欧洲部分地区、加拿大、美国（佛蒙特州除外）、阿根廷等；以官方实时名单为准"],
    restrictedRegions: ["未列入 MetaMask Card 支持名单的地区", "佛蒙特州（美国）", "受制裁地区"],
    applicationRegions: ["MetaMask Card 官方资格页面已开放地区"],
    residencyRequirement: "需位于官方支持地区，并按发卡合作方要求完成验证。",
    virtualCardSupported: true,
    physicalCardSupported: true,
    metalCardSupported: true,
    applePaySupported: "yes",
    googlePaySupported: "yes",
    supportedCurrencies: ["USDC", "USDT", "mUSD", "支持网络上的合资格资产"],
    supportedStablecoins: ["USDC", "USDT", "mUSD"],
    topUpMethods: ["连接的 MetaMask 钱包", "支持网络上的链上资产"],
    openingFee: "虚拟卡免费；Metal Card 199 USD（仅美国，官方曾提示暂停新订单，应以实时页面为准）",
    monthlyFee: "虚拟卡无月费；Metal 以官方计划为准",
    annualFee: "以官方 Card 费用页为准",
    spendingFee: "代币/网络结算费用按 Card 费用页和支付网络而定",
    fxFee: "虚拟卡跨境交易费 1%；Metal Card 0%（官方费用页）",
    atmWithdrawalFee: "虚拟卡 2%；Metal Card 以官方费用页为准",
    cashbackRate: "最高 3% mUSD 返现（Metal 前 10,000 USD/年；虚拟卡 1%）",
    cashbackCap: "Metal Card 3% 返现限每年首 10,000 USD 合资格消费",
    cashbackCurrency: "mUSD",
    cashbackRequirements: "按虚拟/Metal 卡等级、地区和合资格交易确定。",
    riskLevel: "中",
    freezeRisk: "自托管钱包不等于免审核；发卡合作方仍可因地区、KYC 和异常交易限制卡片。",
    customerSupportRating: 4,
    suitableFor: ["使用 MetaMask 且位于开放地区的人", "希望用钱包资产直接消费的人"],
    notSuitableFor: ["不在官方支持名单内的人", "只为 Metal 卡而申请但未确认库存的人"],
    pros: ["直接连接自托管钱包", "Apple Pay/Google Pay 支持", "返现规则清晰披露"],
    cons: ["支持地区有限", "Metal 卡有地区与库存限制", "跨境/ATM 费需要区分卡等级"],
    summary: "MetaMask Card 让合资格用户直接从钱包消费；虚拟卡的 1% mUSD 与 Metal 的 3% 返现需要分开看待。",
    oneLine: "自托管钱包 Mastercard，虚拟卡 1% mUSD，Metal 卡前 1 万美元 3%。",
    bestFor: ["MetaMask 用户", "自托管钱包", "移动支付"],
    scenarios: ["日常消费", "线上订阅", "移动支付", "跨境支付"],
    riskTags: ["地区限制", "Metal 库存/资格", "KYC 审查"],
    tags: ["Mastercard", "虚拟卡", "金属卡", "Apple Pay", "Google Pay", "最高 3% 返现"],
    sourceLinks: [
      { label: "MetaMask Card 官方页面", url: "https://metamask.io/card" },
      { label: "MetaMask Card 介绍与支持地区", url: "https://support.metamask.io/manage-crypto/metamask-card/what-is-metamask-card/" },
      { label: "MetaMask Card 费用与限额", url: "https://support.metamask.io/trade/metamask-card/limits-and-fees/" },
      { label: "MetaMask Card 返现 FAQ", url: "https://support.metamask.io/manage-crypto/metamask-card/card-faq/" },
    ],
    scoreBreakdown: assessedScores(
      { cost: 17, cashback: 10, availability: 10, payment: 14, risk: 11, experience: 8, transparency: 5 },
      "官方帮助中心披露费用、返现、额度与支持地区；Metal Card 的美国资格和订单状态限制了可申请性。",
    ),
    feeModel: { fxRatePct: 1, atmRatePct: 2, cashbackRatePct: 1, openingFeeUsd: 0 },
  }),
  catalogCard({
    slug: "infini-card",
    cardName: "Infini Card",
    shortName: "Infini",
    brandLogo: "IN",
    brandColor: "#E11D48",
    issuer: "Infini Corporate Card 合作发卡机构",
    cardNetwork: ["企业虚拟卡"],
    officialWebsite: "https://help.infini.money/en/articles/13726614-corporate-card",
    supportedRegions: ["Lite 为美国发卡、Pro 为香港发卡；实际用户资格以官方合规页为准"],
    restrictedRegions: ["以 Infini 官方访问限制名单为准（包含中国大陆等限制地区）"],
    applicationRegions: ["需以 Infini App 与官方合规页显示为准"],
    residencyRequirement: "个人用户需完成 KYC；企业用户需完成 KYB，卡片数量和资格随账户类型变化。",
    mainlandChinaPassportSupport: "no",
    virtualCardSupported: true,
    physicalCardSupported: false,
    applePaySupported: "yes",
    googlePaySupported: "yes",
    supportedCurrencies: ["USDT", "USDC", "Infini 账户结算余额"],
    supportedStablecoins: ["USDT", "USDC"],
    topUpMethods: ["Infini 稳定币余额", "链上 USDT/USDC"],
    openingFee: "官方帮助中心列单张企业卡发卡费 10 USD",
    monthlyFee: "以 Lite / Pro / AI Card 及企业计划为准",
    annualFee: "以官方企业卡计划为准",
    spendingFee: "以 Lite / Pro 卡计划及商户类别限制为准",
    fxFee: "Pro Card 1%（官方帮助中心）；其他卡种以计划为准",
    cashbackRate: "最高 1.5% 返现（仅 Pro Card；Lite 未列固定返现）",
    cashbackCap: "以 Pro Card 及账户计划规则为准",
    cashbackCurrency: "以 Infini 卡片计划为准",
    cashbackRequirements: "仅适用于符合 Pro Card 资格及合资格消费的用户。",
    riskLevel: "中高",
    freezeRisk: "企业卡用途、受限商户类别、KYC/KYB 和受限地区政策均可能影响卡片。",
    customerSupportRating: 3,
    suitableFor: ["需要企业虚拟卡或团队卡的人", "能完成 KYC/KYB 并理解受限商户规则的人"],
    notSuitableFor: ["需要实体卡的人", "中国大陆或官方受限地区用户", "需要通用个人消费返现的人"],
    pros: ["支持企业批量发卡", "Lite 支持 Apple Pay/Google Pay", "Pro 公开列出 1.5% 返现"],
    cons: ["产品主要是企业虚拟卡", "地区和商户限制较多", "实体卡不可用"],
    summary: "Infini Card 当前主要是 Lite、Pro、AI 等企业虚拟卡方案；个人可申请数量有限，Pro 的 1.5% 返现并不适用于所有卡种。",
    oneLine: "企业虚拟卡方案，Pro 卡 1.5% 返现；地区、商户和合规限制需要先核验。",
    bestFor: ["企业虚拟卡", "团队用卡", "USDT/USDC 结算"],
    scenarios: ["企业订阅", "团队消费", "线上支付"],
    riskTags: ["企业卡定位", "地区限制", "商户限制"],
    tags: ["虚拟卡", "企业卡", "Apple Pay", "Google Pay", "USDT", "1.5% 返现"],
    sourceLinks: [
      { label: "Infini Corporate Card 官方帮助", url: "https://help.infini.money/en/articles/13726614-corporate-card" },
      { label: "Infini 官方访问限制", url: "https://docs.infini.money/compliance-and-regulatory/access-restrictions" },
      { label: "Infini 官方产品说明", url: "https://docs.infini.money/product/infini" },
    ],
    scoreBreakdown: assessedScores(
      { cost: 13, cashback: 9, availability: 6, payment: 9, risk: 9, experience: 6, transparency: 4 },
      "官方明确这是企业虚拟卡计划，并披露 Pro 返现与地区限制；不适合按通用个人实体卡进行比较。",
    ),
    feeModel: { fxRatePct: 1, cashbackRatePct: 1.5, openingFeeUsd: 10 },
  }),
];

export const quickFilters = [
  { id: "mainland", label: "中国大陆相关" },
  { id: "japan", label: "支持日本居民" },
  { id: "hongkong", label: "支持香港用户" },
  { id: "europe", label: "支持欧洲用户" },
  { id: "apple-pay", label: "Apple Pay" },
  { id: "google-pay", label: "Google Pay" },
  { id: "physical", label: "实体卡" },
  { id: "virtual", label: "虚拟卡" },
  { id: "usdt", label: "USDT" },
  { id: "usdc", label: "USDC" },
  { id: "cashback", label: "高返现" },
  { id: "low-fee", label: "低手续费" },
  { id: "atm", label: "ATM 取现" },
  { id: "daily", label: "日常消费" },
  { id: "travel", label: "跨境/旅行" },
];

export const sortOptions = [
  { id: "recommended", label: "综合推荐" },
  { id: "cashback", label: "返现最高" },
  { id: "low-fee", label: "手续费最低" },
  { id: "easy", label: "开卡门槛最低" },
  { id: "beginner", label: "适合新手" },
  { id: "japan", label: "适合日本" },
  { id: "regions", label: "支持地区最多" },
  { id: "updated", label: "最近更新" },
];

export function getCard(slug: string) {
  return cards.find((card) => card.slug === slug);
}

export function supportLabel(value: SupportState) {
  if (value === "yes") return "支持";
  if (value === "no") return "不支持";
  if (value === "partial") return "部分支持";
  return "需确认";
}

export function supportTone(value: SupportState) {
  if (value === "yes") return "positive";
  if (value === "no") return "negative";
  if (value === "partial") return "warning";
  return "neutral";
}

export function allSourceLinks() {
  const seen = new Set<string>();
  return cards.flatMap((card) =>
    card.sourceLinks
      .filter((source) => {
        if (seen.has(source.url)) return false;
        seen.add(source.url);
        return true;
      })
      .map((source) => ({ ...source, cardName: card.cardName })),
  );
}

export const rankingDefinitions = [
  {
    slug: "overall",
    title: "综合推荐榜",
    logic: "按 100 分制总分排序，同时参考费用、权益、支付便利性、风控和资料透明度。",
    cards: [...cards].sort((a, b) => b.overallScore - a.overallScore),
  },
  {
    slug: "japan",
    title: "日本用户推荐榜",
    logic: "优先考虑日本在留卡/居住地支持、Apple Pay、线下消费和稳定币路径；不把未确认支持的产品排在前列。",
    cards: [...cards].sort((a, b) => {
      const aScore =
        (a.japanResidenceCardSupport === "yes" ? 20 : a.japanResidenceCardSupport === "partial" ? 10 : 0) +
        (a.applePaySupported !== "no" ? 5 : 0) +
        a.overallScore;
      const bScore =
        (b.japanResidenceCardSupport === "yes" ? 20 : b.japanResidenceCardSupport === "partial" ? 10 : 0) +
        (b.applePaySupported !== "no" ? 5 : 0) +
        b.overallScore;
      return bScore - aScore;
    }),
  },
  {
    slug: "cashback",
    title: "高返现榜",
    logic: "按可解释的返现分、名义返现比例和返现门槛综合排序，避免只看最高宣传比例。",
    cards: [...cards].sort((a, b) => b.scoreBreakdown.cashback.score - a.scoreBreakdown.cashback.score),
  },
  {
    slug: "low-fee",
    title: "低手续费榜",
    logic: "优先比较消费费、外汇费、月费和开卡费；没有公开费用的产品会被降低排序。",
    cards: [...cards].sort((a, b) => b.scoreBreakdown.cost.score - a.scoreBreakdown.cost.score),
  },
  {
    slug: "virtual",
    title: "虚拟卡推荐榜",
    logic: "筛选支持虚拟卡的产品，再按开通速度、移动支付和线上订阅适配排序。",
    cards: cards.filter((card) => card.virtualCardSupported).sort((a, b) => b.overallScore - a.overallScore),
  },
  {
    slug: "physical",
    title: "实体卡推荐榜",
    logic: "筛选支持实体卡的产品，再按网络覆盖、ATM、旅行和线下刷卡体验排序。",
    cards: cards.filter((card) => card.physicalCardSupported).sort((a, b) => b.scoreBreakdown.payment.score - a.scoreBreakdown.payment.score),
  },
  {
    slug: "travel",
    title: "旅行消费推荐榜",
    logic: "重点看外汇成本、实体卡、Apple Pay/Google Pay、ATM 和多地区覆盖。",
    cards: [...cards].sort((a, b) => {
      const score = (card: CryptoCard) =>
        card.scoreBreakdown.payment.score + card.scoreBreakdown.availability.score + card.scoreBreakdown.cost.score;
      return score(b) - score(a);
    }),
  },
  {
    slug: "atm",
    title: "ATM 取现推荐榜",
    logic: "优先展示实体卡、免费额度清晰、ATM 费用较低且资料透明的产品。",
    cards: [...cards].sort((a, b) => {
      const score = (card: CryptoCard) =>
        (card.physicalCardSupported ? 10 : 0) + card.scoreBreakdown.cost.score + card.scoreBreakdown.transparency.score;
      return score(b) - score(a);
    }),
  },
  {
    slug: "beginner",
    title: "新手友好榜",
    logic: "偏向费用说明清楚、地区规则明确、无需复杂质押或借贷模式的产品。",
    cards: [...cards].sort((a, b) => {
      const score = (card: CryptoCard) =>
        card.scoreBreakdown.transparency.score + card.scoreBreakdown.experience.score + card.scoreBreakdown.risk.score;
      return score(b) - score(a);
    }),
  },
  {
    slug: "lower-risk",
    title: "风险较低榜",
    logic: "并非无风险；排序偏向资料透明、合规路径清晰和冻结风险说明更明确的产品。",
    cards: [...cards].sort((a, b) => b.scoreBreakdown.risk.score - a.scoreBreakdown.risk.score),
  },
];
