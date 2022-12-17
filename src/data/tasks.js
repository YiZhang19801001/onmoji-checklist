export const dailyTasks = [
  { name: '签到', estimation: 0.25 },
  { name: '每日免费抽卡', estimation: 0.25 },
  {
    name: '好友赠送友情点，好友界面祝福可以有些奖励',
    estimation: 0.5,
  },
  { name: '礼包屋-黑蛋碎片', estimation: 0.25 },
  { name: '阴阳寮-领取寮资金', estimation: 0.25 },
  { name: '阴阳寮-结界卡调整', estimation: 5, duration: 360 },
  {
    name: '阴阳寮-地图领20体力',
    estimation: 0.25,
    duration: 240,
  },
  {
    name: '阴阳寮-祈愿发布和赠送碎片',
    estimation: 0.25,
  },
  { name: '阴阳寮-寮30', estimation: 0.5 },
  {
    name: '阴阳寮-寮活动, 周一到周四是麒麟, 周五到周日阴界之门(必做)',
    resetTime: 22,
    estimation: 15,
  },
  { name: '阴阳寮-道馆', estimation: 30 },
  {
    name: '小纸人每天体力-早',
    resetTime: 15,
    estimation: 0.25,
  },
  {
    name: '小纸人每天体力-晚',
    resetTime: 21,
    estimation: 0.25,
  },
  {
    name: '宠物-喂食,一次御魂本拿奖励',
    estimation: 2,
  },
  { name: '宠物-后院,喵爪钱币商店', estimation: 1 },
  { name: '悬赏任务-早', resetTime: 8, endTime: '6pm', estimation: 10 },
  { name: '悬赏任务-晚', resetTime: 21, endTime: '5am', estimation: 10 },
  { name: '地域鬼王', resetTime: 9, estimation: 5 },
  {
    name: '式神委派-只做新手、弥助的画、虫之印、鸟之语',
    estimation: 2,
  },
  { name: '逢魔之时', resetTime: 20, endTime: '10pm', estimation: 10 },
  {
    name: '金币、经验妖怪(12am、12pm各加一次挑战次数)',
    estimation: 10,
  },
  { name: '守护历练:每天5次师徒一起', estimation: 15 },
  {
    name: '花合战100点每日做满有勾玉',
    estimation: 30,
  },
  { name: '开3个小号做协战50拿勾玉', estimation: 30 },
];

export const weeklyTasks = [
  { name: '商店更新秘卷屋换30个6星御魂', estimation: 5 },
  { name: '荣誉-黑碎,蓝票', estimation: 0.5 },
  { name: '勋章-黑蛋,蓝票,体力', estimation: 0.5 },
  { name: '魅力-黑碎,蓝票', estimation: 0.5 },
  { name: '寮商店', estimation: 5 },
  { name: '千物宝库', estimation: 5 },
  { name: '分享图鉴', estimation: 0.5 },
  { name: '分享地域鬼王', estimation: 0.5 },
  { name: '分享秘闻竞速', estimation: 0.5 },
  { name: '秘闻竞速或百战368勾玉必做', estimation: 120 },
  { name: '三种PvP(待整理)', estimation: null },
  { name: '日轮-周一到周五50次加成', estimation: null },
  { name: '日轮-周六50次加成', estimation: null },
  { name: '日轮-周日50次加成', estimation: null },
  { name: '真蛇-I', estimation: 10 },
  { name: '真蛇-II', estimation: 10 },
];

export const otherTasks = [
  { name: '神龛-黑蛋必买其他看情况', estimation: 5, duration: '2weeks' },
];
