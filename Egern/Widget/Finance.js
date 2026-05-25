export default async function (ctx) {

  const region = ctx.env.GAS_REGION || "zhejiang/shaoxing";

  // ===== 油价 =====
  let oil92 = "--";

  try {
    const oilRes = await fetch(
      `https://api.qqsuu.cn/api/dm-oilprice?prov=${region}`
    );

    const oilJson = await oilRes.json();

    oil92 = oilJson.data?.oil_92 || "--";

  } catch (e) {}

  // ===== 黄金 =====
  let gold = "--";

  try {
    const goldRes = await fetch(
      "https://api.vvhan.com/api/gold"
    );

    const goldJson = await goldRes.json();

    gold = goldJson.data || "--";

  } catch (e) {}

  // ===== BTC =====
  let btc = "--";

  try {

    const btcRes = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );

    const btcJson = await btcRes.json();

    btc = Math.round(
      btcJson.bpi.USD.rate_float
    );

  } catch (e) {}

  // ===== 美元指数（模拟）=====
  const usd = "104.2";

  return {
    type: "widget",

    backgroundGradient: {
      type: "linear",
      colors: ["#141E30", "#243B55"],
      startPoint: { x: 0, y: 0 },
      endPoint: { x: 1, y: 1 }
    },

    padding: 16,
    gap: 10,

    children: [

      {
        type: "text",
        text: "📊 金融面板",
        textColor: "#FFFFFF",
        font: {
          size: "headline",
          weight: "bold"
        }
      },

      row("⛽ 92#", oil92 + " 元/L"),
      row("🟡 黄金", gold + " 元/克"),
      row("₿ BTC", "$" + btc),
      row("💵 美元指数", usd)

    ]
  };
}

function row(name, value) {

  return {
    type: "stack",
    direction: "row",

    children: [

      {
        type: "text",
        text: name,
        flex: 1,
        textColor: "#B8E1FF"
      },

      {
        type: "text",
        text: value,
        textColor: "#FFFFFF"
      }
    ]
  };
}
