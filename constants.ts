import { DaySchedule, ActivityType, ExpenseItem, ChecklistItem } from './types';

export const TRIP_START_DATE = new Date('2026-01-01T00:00:00');
export const TRIP_END_DATE = new Date('2026-01-06T23:59:59');

export const INITIAL_EXPENSES: ExpenseItem[] = [
    { id: 'e1', title: '關西機場快線', amountJPY: 2400, amountTWD: 504, category: 'Transport', date: '2026-01-01' },
    { id: 'e2', title: '便利商店', amountJPY: 800, amountTWD: 168, category: 'Food', date: '2026-01-01' },
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
    { id: 'c1', label: '護照', checked: false, category: 'Luggage' },
    { id: 'c2', label: '網卡/漫遊', checked: true, category: 'Luggage' },
    { id: 'c3', label: '環球影城門票 QR', checked: false, category: 'Luggage' },
    { id: 'c4', label: '變壓器/轉接頭', checked: true, category: 'Luggage' },
    { id: 'c5', label: '東京香蕉', checked: false, category: 'Gift' },
    { id: 'c6', label: '合利他命', checked: false, category: 'Gift' },
    { id: 'c7', label: '白色戀人', checked: false, category: 'Gift' },
];

export const ITINERARY: DaySchedule[] = [
  {
    date: '2026-01-01',
    dayLabel: 'DAY 01',
    weatherForecast: { tempHigh: 9, tempLow: 2, condition: 'Cloudy', advisory: '防風大衣' },
    items: [
      {
        id: '1-1',
        startTime: '10:00',
        endTime: '14:00',
        title: '抵達關西機場 (KIX)',
        type: ActivityType.Transport,
        transportMethod: 'Plane',
        description: 'JL888 / T2航廈',
        location: { name: 'Kansai International Airport', address: 'Kansai International Airport' }
      },
      {
        id: '1-2',
        startTime: '14:30',
        endTime: '15:20',
        title: 'Haruka 特急 > 市區',
        type: ActivityType.Transport,
        transportMethod: 'Train',
        description: '自由席 / JR Pass',
        location: { name: 'Tennoji Station', address: 'Tennoji Station, Osaka' }
      },
      {
        id: '1-3',
        startTime: '18:00',
        endTime: '21:00',
        title: '道頓堀晚餐',
        type: ActivityType.Food,
        description: '拉麵、章魚燒',
        location: { name: 'Dotonbori', address: 'Dotonbori, Osaka' }
      }
    ]
  },
  {
    date: '2026-01-02',
    dayLabel: 'DAY 02',
    weatherForecast: { tempHigh: 8, tempLow: 1, condition: 'Sunny', advisory: '暖暖包' },
    items: [
      {
        id: '2-1',
        startTime: '08:30',
        endTime: '19:00',
        title: 'Universal Studios Japan',
        type: ActivityType.Sightseeing,
        description: '瑪利歐世界、哈利波特',
        location: { name: 'Universal Studios Japan', address: 'Universal Studios Japan' }
      },
      {
        id: '2-2',
        startTime: '19:30',
        title: 'CityWalk 晚餐',
        type: ActivityType.Food,
        location: { name: 'Universal CityWalk', address: 'Universal CityWalk Osaka' }
      }
    ]
  },
  {
    date: '2026-01-03',
    dayLabel: 'DAY 03',
    weatherForecast: { tempHigh: 10, tempLow: 3, condition: 'Sunny', advisory: '舒適步行' },
    items: [
      {
        id: '3-1',
        startTime: '10:00',
        endTime: '12:30',
        title: '大阪城公園',
        type: ActivityType.Sightseeing,
        location: { name: 'Osaka Castle', address: 'Osaka Castle' }
      },
      {
        id: '3-2',
        startTime: '15:00',
        endTime: '17:00',
        title: '梅田購物',
        type: ActivityType.Shopping,
        location: { name: 'Grand Front Osaka', address: 'Grand Front Osaka' }
      }
    ]
  },
  {
    date: '2026-01-04',
    dayLabel: 'DAY 04',
    weatherForecast: { tempHigh: 7, tempLow: 0, condition: 'Cloudy', advisory: '奈良注意保暖' },
    items: [
      {
        id: '4-1',
        startTime: '10:00',
        endTime: '12:00',
        title: '奈良公園 & 東大寺',
        type: ActivityType.Sightseeing,
        description: '餵食小鹿',
        location: { name: 'Nara Park', address: 'Nara Park' }
      }
    ]
  },
  {
    date: '2026-01-05',
    dayLabel: 'DAY 05',
    weatherForecast: { tempHigh: 6, tempLow: 1, condition: 'Rain', advisory: '攜帶折疊傘' },
    items: [
      {
        id: '5-1',
        startTime: '10:00',
        endTime: '13:00',
        title: '海遊館',
        type: ActivityType.Sightseeing,
        location: { name: 'Osaka Aquarium Kaiyukan', address: 'Osaka Aquarium Kaiyukan' }
      }
    ]
  },
  {
    date: '2026-01-06',
    dayLabel: 'DAY 06',
    weatherForecast: { tempHigh: 9, tempLow: 2, condition: 'Sunny', advisory: '檢查行李' },
    items: [
      {
        id: '6-1',
        startTime: '10:00',
        title: '前往機場',
        type: ActivityType.Transport,
        transportMethod: 'Train',
        location: { name: 'Kansai International Airport', address: 'Kansai International Airport' }
      }
    ]
  }
];