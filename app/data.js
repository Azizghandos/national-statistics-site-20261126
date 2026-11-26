// NusantaraStats — all figures are from BPS (Statistics Indonesia) publications,
// 2023–2025. Values are rounded and labelled with their year; nothing here is
// invented. Where BPS publishes an estimate rather than a census count, the
// label says so. Population figures are mid-year estimates unless noted.

export const SOURCE = 'BPS — Statistics Indonesia';

export const HEADLINE = [
  { key: 'population', label: 'Population', value: 281.6, unit: 'million', year: 2024, note: 'Mid-year estimate, BPS' },
  { key: 'gdp', label: 'Gross domestic product', value: 22139, unit: 'Rp trillion', year: 2024, note: 'Current prices, BPS' },
  { key: 'gdpPerCapita', label: 'GDP per capita', value: 4925, unit: 'US$', year: 2024, note: 'Current prices, BPS' },
  { key: 'growth', label: 'Economic growth', value: 5.03, unit: '%', year: 2024, note: 'Year on year, BPS' },
  { key: 'unemployment', label: 'Unemployment rate', value: 4.76, unit: '%', year: 2024, note: 'August 2024, BPS (Sakernas)' },
  { key: 'inflation', label: 'Inflation', value: 1.57, unit: '%', year: 2024, note: 'Year on year, December 2024, BPS' },
  { key: 'lifeExpectancy', label: 'Life expectancy at birth', value: 74.0, unit: 'years', year: 2024, note: 'BPS' },
  { key: 'hdi', label: 'Human Development Index', value: 75.02, unit: 'index', year: 2024, note: 'BPS' },
];

// Population by year, millions (2015–2024). 2020 is the census count;
// other years are BPS mid-year estimates.
export const POPULATION_SERIES = [
  { year: 2015, value: 255.6 }, { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 }, { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 }, { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 }, { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 },
];

// Age structure, 2024 estimate, BPS (percent of population).
export const AGE_STRUCTURE = [
  { group: '0–14 years', share: 24.5 },
  { group: '15–64 years', share: 68.5 },
  { group: '65+ years', share: 7.0 },
];

// Ten most populous provinces, 2024 mid-year estimates, millions.
export const TOP_PROVINCES = [
  { name: 'West Java', value: 50.4 },
  { name: 'East Java', value: 41.8 },
  { name: 'Central Java', value: 37.9 },
  { name: 'North Sumatra', value: 15.6 },
  { name: 'Banten', value: 12.4 },
  { name: 'Jakarta', value: 10.6 },
  { name: 'South Sulawesi', value: 9.4 },
  { name: 'Lampung', value: 9.3 },
  { name: 'South Sumatra', value: 8.9 },
  { name: 'Riau', value: 6.6 },
];

// GDP at current prices, Rp trillion, BPS.
export const GDP_SERIES = [
  { year: 2020, value: 15434 }, { year: 2021, value: 16977 },
  { year: 2022, value: 19588 }, { year: 2023, value: 20892 },
  { year: 2024, value: 22139 },
];

// Real GDP growth, % year on year, BPS.
export const GROWTH_SERIES = [
  { year: 2020, value: -2.07 }, { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// GDP shares by sector, 2024, % of GDP at current prices, BPS (rounded).
export const SECTOR_SHARES = [
  { sector: 'Manufacturing', share: 18.7 },
  { sector: 'Trade & repair', share: 13.0 },
  { sector: 'Agriculture, forestry & fishing', share: 12.5 },
  { sector: 'Construction', share: 9.9 },
  { sector: 'Mining & quarrying', share: 8.4 },
  { sector: 'All other sectors', share: 37.5 },
];

// Inflation, % year on year (December), BPS.
export const INFLATION_SERIES = [
  { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Unemployment rate, % of labour force, August, BPS (Sakernas).
export const UNEMPLOYMENT_SERIES = [
  { year: 2020, value: 7.07 }, { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 }, { year: 2023, value: 5.32 },
  { year: 2024, value: 4.76 },
];

// Employment by sector, % of employed persons, August 2024, BPS.
export const EMPLOYMENT_SECTORS = [
  { sector: 'Agriculture, forestry & fishing', share: 28.2 },
  { sector: 'Trade', share: 19.1 },
  { sector: 'Manufacturing', share: 13.7 },
  { sector: 'Community & personal services', share: 15.4 },
  { sector: 'Construction', share: 7.6 },
  { sector: 'Transport & communication', share: 5.5 },
  { sector: 'Other sectors', share: 10.5 },
];

export const LABOUR = {
  labourForceMillion: 152.1, year: 2024, note: 'August 2024, BPS (Sakernas)',
  participationRate: 70.6, note: 'Labour force participation rate, August 2024, BPS',
  employedMillion: 144.9, note: 'Employed persons, August 2024, BPS',
  informalShare: 59.2, note: 'Share of employed in informal work, August 2024, BPS',
};

// Education and health, BPS.
export const EDUCATION_HEALTH = [
  { key: 'literacy', label: 'Literacy rate (age 15+)', value: 96.4, unit: '%', year: 2023, note: 'BPS' },
  { key: 'schooling', label: 'Mean years of schooling', value: 9.1, unit: 'years', year: 2024, note: 'BPS' },
  { key: 'expectedSchooling', label: 'Expected years of schooling', value: 13.2, unit: 'years', year: 2024, note: 'BPS' },
  { key: 'lifeExpectancy', label: 'Life expectancy at birth', value: 74.0, unit: 'years', year: 2024, note: 'BPS' },
  { key: 'infantMortality', label: 'Infant mortality', value: 16, unit: 'per 1,000 live births', year: 2023, note: 'BPS estimate' },
  { key: 'hdi', label: 'Human Development Index', value: 75.02, unit: 'index', year: 2024, note: 'BPS' },
];

// All 38 provinces (post-2022 expansion). Population: 2024 mid-year estimates
// in millions, rounded to one decimal (BPS). Area: km², rounded, official
// provincial areas. Density is computed from those two rounded values.
export const PROVINCES = [
  { name: 'Aceh', pop: 5.55, area: 57956 },
  { name: 'North Sumatra', pop: 15.6, area: 72981 },
  { name: 'West Sumatra', pop: 5.9, area: 42013 },
  { name: 'Riau', pop: 6.6, area: 87024 },
  { name: 'Jambi', pop: 3.7, area: 50058 },
  { name: 'South Sumatra', pop: 8.9, area: 91592 },
  { name: 'Bengkulu', pop: 2.1, area: 19919 },
  { name: 'Lampung', pop: 9.3, area: 34624 },
  { name: 'Bangka Belitung Islands', pop: 1.5, area: 16424 },
  { name: 'Riau Islands', pop: 2.3, area: 8202 },
  { name: 'Jakarta', pop: 10.6, area: 664 },
  { name: 'West Java', pop: 50.4, area: 35378 },
  { name: 'Central Java', pop: 37.9, area: 32801 },
  { name: 'Yogyakarta', pop: 3.8, area: 3133 },
  { name: 'East Java', pop: 41.8, area: 47803 },
  { name: 'Banten', pop: 12.4, area: 9663 },
  { name: 'Bali', pop: 4.4, area: 5780 },
  { name: 'West Nusa Tenggara', pop: 5.6, area: 18572 },
  { name: 'East Nusa Tenggara', pop: 5.7, area: 47931 },
  { name: 'West Kalimantan', pop: 5.8, area: 147307 },
  { name: 'Central Kalimantan', pop: 2.8, area: 153564 },
  { name: 'South Kalimantan', pop: 4.3, area: 38744 },
  { name: 'East Kalimantan', pop: 3.9, area: 129066 },
  { name: 'North Kalimantan', pop: 0.74, area: 75467 },
  { name: 'North Sulawesi', pop: 2.7, area: 13892 },
  { name: 'Central Sulawesi', pop: 3.1, area: 61841 },
  { name: 'South Sulawesi', pop: 9.4, area: 46717 },
  { name: 'Southeast Sulawesi', pop: 2.8, area: 38068 },
  { name: 'Gorontalo', pop: 1.3, area: 11257 },
  { name: 'West Sulawesi', pop: 1.6, area: 16787 },
  { name: 'Maluku', pop: 2.0, area: 46914 },
  { name: 'North Maluku', pop: 1.4, area: 31982 },
  { name: 'West Papua', pop: 0.56, area: 60275 },
  { name: 'Southwest Papua', pop: 0.62, area: 39123 },
  { name: 'Papua', pop: 1.1, area: 82680 },
  { name: 'South Papua', pop: 0.54, area: 117849 },
  { name: 'Central Papua', pop: 1.35, area: 61073 },
  { name: 'Highland Papua', pop: 1.43, area: 51213 },
];

export function density(province) {
  return (province.pop * 1e6) / province.area;
}

export function formatNumber(value, decimals = 1) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
