import "./styles.css";
import { Chart } from "frappe-charts";
//import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";

/*
document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`; 
*/

if (document.readyState !== "loading") {
  console.log("valmis");
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("else valmis");
    initialize();
  });
}

function initialize() {
  const JQ = {
    query: [
      {
        code: "Vuosi",
        selection: {
          filter: "item",
          values: [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021"
          ]
        }
      },
      {
        code: "Alue",
        selection: {
          filter: "item",
          values: ["SSS"]
        }
      },
      {
        code: "Tiedot",
        selection: {
          filter: "item",
          values: ["vaesto"]
        }
      }
    ],
    response: {
      format: "json-stat2"
    }
  };

  const getData = async () => {
    const url =
      "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(JQ)
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();

    return data;
  };

  const newChart = async () => {
    const data = await getData();
    const year = Object.values(data.dimension.Vuosi.category.label);
    const muncipilaty = Object.values(data.dimension.Alue.category.label);
    const x = data.value;
    const st = x.map(String);
    console.log(data);
    console.log(typeof st[1]);
    console.log(typeof year[1]);

    const ChartData = {
      labels: year,
      datasets: [
        {
          name: "Koko suomi",
          values: x
        }
      ]
    };
    console.log("ttt");
    const chart = new Chart("#chart", {
      title: "Tässä vois olla joku kiva otsikko",
      data: ChartData,
      type: "line",
      height: 450,
      colors: ["#eb5146"]

    });
  };

  newChart();
}
