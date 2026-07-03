export type DisplayRegion = {
  key: string;
  label: string;
  flag?: string;
  source: string;
  kind: "country" | "macro" | "note";
};

const REGION_CODES = `
AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ
CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR
GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP
KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT
MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW
SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG
UM US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW
`
  .trim()
  .split(/\s+/);

const regionCodeSet = new Set(REGION_CODES);
const zhRegionNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["zh-CN"], { type: "region" })
    : null;
const enRegionNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

const regionLabelOverrides: Record<string, string> = {
  AE: "阿联酋",
  AX: "奥兰群岛",
  BO: "玻利维亚",
  BQ: "荷属加勒比",
  BN: "文莱",
  CD: "刚果（金）",
  CG: "刚果（布）",
  CI: "科特迪瓦",
  CN: "中国大陆",
  CV: "佛得角",
  CW: "库拉索",
  CZ: "捷克",
  GB: "英国",
  HK: "香港",
  IR: "伊朗",
  KP: "朝鲜",
  KR: "韩国",
  LA: "老挝",
  MO: "澳门",
  MD: "摩尔多瓦",
  PS: "巴勒斯坦",
  RU: "俄罗斯",
  SX: "荷属圣马丁",
  SY: "叙利亚",
  TW: "台湾",
  TZ: "坦桑尼亚",
  US: "美国",
  VA: "梵蒂冈",
  VE: "委内瑞拉",
  VN: "越南",
  XK: "科索沃",
};

function normalizeLookupKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/&/g, " and ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function decodeSourceText(value: string) {
  return value
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code: string) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/u([0-9a-fA-F]{4})/g, (_, code: string) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/\\n|\\r/g, ", ")
    .replace(/rn(?=[A-Z])/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

const nameToRegionCode = new Map<string, string>();

for (const code of REGION_CODES) {
  const englishName = enRegionNames?.of(code);
  if (englishName) nameToRegionCode.set(normalizeLookupKey(englishName), code);
}

const countryAliases: Record<string, string> = {
  "aland islands": "AX",
  "antigua barbuda": "AG",
  "bolivarian republic of": "VE",
  "bosnia and herzegovina": "BA",
  "bosnia herzegovina": "BA",
  "brunei darussalam": "BN",
  "cabo verde": "CV",
  "cape verde": "CV",
  "caribbean netherlands": "BQ",
  "china mainland": "CN",
  "cocos islands": "CC",
  "congo brazzaville": "CG",
  "congo republic": "CG",
  "congo republic of the": "CG",
  "congo democratic republic": "CD",
  "congo democratic republic of the": "CD",
  "congo dr": "CD",
  "cote d ivoire": "CI",
  "czech republic": "CZ",
  "czech republic or czechia": "CZ",
  "democratic people s republic of korea": "KP",
  "democratic republic of congo": "CD",
  "dominica republica": "DO",
  "dominicana": "DO",
  "east timor": "TL",
  "falkland islands malvinas": "FK",
  "federated states of": "FM",
  "french west indies": "GP",
  "heard and mcdonald islands": "HM",
  "hong kong": "HK",
  "ivory coast": "CI",
  "macao": "MO",
  "macau": "MO",
  "micronesia": "FM",
  "moldova": "MD",
  "north macedonia": "MK",
  "palestine": "PS",
  "republic of korea": "KR",
  "russia": "RU",
  "russian federation": "RU",
  "saint barthelemy": "BL",
  "saint helena": "SH",
  "saint kitts and nevis": "KN",
  "saint lucia": "LC",
  "saint martin": "MF",
  "saint pierre and miquelon": "PM",
  "saint vincent and the grenadines": "VC",
  "sao tome and principe": "ST",
  "south georgia and the south sandwich islands": "GS",
  "south korea": "KR",
  "syria": "SY",
  "taiwan": "TW",
  "tanzania": "TZ",
  "the bahamas": "BS",
  "uae": "AE",
  "uk": "GB",
  "united kingdom": "GB",
  "united states": "US",
  "united states of america": "US",
  "usa": "US",
  "vatican": "VA",
  "venezuela": "VE",
  "viet nam": "VN",
  "vietnam": "VN",
};

for (const [name, code] of Object.entries(countryAliases)) {
  nameToRegionCode.set(normalizeLookupKey(name), code);
}

const localizedCountryAliases: Record<string, string> = {
  中国: "CN",
  中国大陆: "CN",
  美国: "US",
  加拿大: "CA",
  英国: "GB",
  日本: "JP",
  香港: "HK",
  澳门: "MO",
  台湾: "TW",
  新加坡: "SG",
  韩国: "KR",
  澳大利亚: "AU",
  新西兰: "NZ",
  巴西: "BR",
  阿根廷: "AR",
  墨西哥: "MX",
  秘鲁: "PE",
  智利: "CL",
  哥伦比亚: "CO",
  瑞士: "CH",
  印度: "IN",
  印度尼西亚: "ID",
  马来西亚: "MY",
  菲律宾: "PH",
  泰国: "TH",
  越南: "VN",
  阿联酋: "AE",
  哈萨克斯坦: "KZ",
  土耳其: "TR",
  以色列: "IL",
  南非: "ZA",
};

const macroRegions: Array<[RegExp, Omit<DisplayRegion, "key" | "source">]> = [
  [/^(全球|全球多地区|global|worldwide|available globally|global markets|全球零售用户)/i, { label: "全球多地区", flag: "🌐", kind: "macro" }],
  [/^(欧洲\/eea|europe\/eea|eea|europe|european economic area|eu|欧盟|欧洲|欧洲经济区)/i, { label: "欧洲/欧洲经济区", flag: "🇪🇺", kind: "macro" }],
  [/^(eu\/us|us\/eu|eu us)$/i, { label: "欧盟/美国", flag: "🌍", kind: "macro" }],
  [/^(latam|latin america|拉美|拉丁美洲)/i, { label: "拉丁美洲", flag: "🌎", kind: "macro" }],
  [/^(apac|asia pacific|亚太)/i, { label: "亚太地区", flag: "🌏", kind: "macro" }],
  [/^(middle east|中东)/i, { label: "中东地区", flag: "🌍", kind: "macro" }],
  [/^(africa|most of africa|非洲)/i, { label: "非洲地区", flag: "🌍", kind: "macro" }],
  [/^(caribbean|加勒比)/i, { label: "加勒比地区", flag: "🌎", kind: "macro" }],
  [/^(balkans|巴尔干)/i, { label: "巴尔干地区", flag: "🌍", kind: "macro" }],
  [/^(baltic states|波罗的海)/i, { label: "波罗的海国家", flag: "🌍", kind: "macro" }],
  [/^(cis region|独联体)/i, { label: "独联体地区", flag: "🌍", kind: "macro" }],
];

function flagForCode(code: string) {
  if (code.length !== 2) return undefined;
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127_397 + char.charCodeAt(0)));
}

function labelForCode(code: string) {
  const upper = code.toUpperCase();
  return regionLabelOverrides[upper] ?? zhRegionNames?.of(upper) ?? upper;
}

function splitRegionText(value: string) {
  const decoded = decodeSourceText(value);
  if (!decoded) return [];

  const isLongCountryList = decoded.includes(",") || /rn(?=[A-Z])/.test(value) || decoded.length > 80;
  if (!isLongCountryList) return [decoded];

  return decoded
    .split(/[,;；、]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function translateLooseRegionText(value: string) {
  return value
    .replace(/\bAvailable globally\b/gi, "全球多地区")
    .replace(/\bglobal markets\b/gi, "全球多地区")
    .replace(/\bglobal retail users\b/gi, "全球零售用户")
    .replace(/\bEurope\b/gi, "欧洲")
    .replace(/\bUnited States\b/gi, "美国")
    .replace(/\bUnited Kingdom\b/gi, "英国")
    .replace(/\bLATAM\b/gi, "拉丁美洲")
    .replace(/\bAPAC\b/gi, "亚太地区")
    .replace(/\bMiddle East\b/gi, "中东")
    .replace(/\bAfrica\b/gi, "非洲")
    .replace(/\bretail users\b/gi, "零售用户")
    .replace(/\bmarkets\b/gi, "市场")
    .trim();
}

function toDisplayRegion(value: string): DisplayRegion | null {
  const source = decodeSourceText(value);
  if (!source) return null;

  const upperSource = source.toUpperCase();
  if (/^[A-Z]{2}$/.test(upperSource) && regionCodeSet.has(upperSource)) {
    return {
      key: `country-${upperSource}`,
      label: labelForCode(upperSource),
      flag: flagForCode(upperSource),
      source,
      kind: "country",
    };
  }

  const localizedCode = localizedCountryAliases[source];
  if (localizedCode) {
    return {
      key: `country-${localizedCode}`,
      label: labelForCode(localizedCode),
      flag: flagForCode(localizedCode),
      source,
      kind: "country",
    };
  }

  for (const [pattern, region] of macroRegions) {
    if (pattern.test(source)) {
      return {
        key: `macro-${region.label}`,
        source,
        ...region,
      };
    }
  }

  const code = nameToRegionCode.get(normalizeLookupKey(source));
  if (code) {
    return {
      key: `country-${code}`,
      label: labelForCode(code),
      flag: flagForCode(code),
      source,
      kind: "country",
    };
  }

  return {
    key: `note-${source}`,
    label: translateLooseRegionText(source),
    source,
    kind: /[A-Za-z]/.test(source) ? "macro" : "note",
  };
}

export function getDisplayRegions(regions: string[]) {
  const deduped = new Map<string, DisplayRegion>();

  for (const region of regions) {
    for (const part of splitRegionText(region)) {
      const displayRegion = toDisplayRegion(part);
      if (!displayRegion) continue;
      if (!deduped.has(displayRegion.key)) deduped.set(displayRegion.key, displayRegion);
    }
  }

  return Array.from(deduped.values());
}

export function summarizeRegions(regions: string[], visibleCount = 5) {
  const all = getDisplayRegions(regions);
  const visible = all.slice(0, visibleCount);

  return {
    all,
    visible,
    hiddenCount: Math.max(0, all.length - visible.length),
    hasMore: all.length > visible.length,
  };
}
