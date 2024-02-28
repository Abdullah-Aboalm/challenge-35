const myJson = new XMLHttpRequest();

myJson.open("GET", "data.json");
myJson.send();

myJson.onreadystatechange = function () {
  if (myJson.readyState === 4 && myJson.status === 200) {
    let myJsonData = JSON.parse(myJson.responseText);
    let daysArr = [];
    let amounts = [];
    let day = new Date();

    for (let i = 0; i < myJsonData.length; i++) {
      daysArr.push(myJsonData[i].day);
      amounts.push(myJsonData[i].amount);
    }

    let currentDay = daysArr[day.getDay()];
    let allCharts = document.querySelectorAll(".chart");

    allCharts.forEach((chart) => {
      let span = chart.querySelector("span");
      let p = chart.querySelector("p");
      let tip = document.createElement("span");
      tip.className = "tip";
      span.addEventListener("mouseover", () => {
        let dayIndex = daysArr.indexOf(p.innerHTML);
        let currentDayPrice = amounts[dayIndex];
        tip.innerHTML = `$${currentDayPrice}`;
        chart.appendChild(tip);
      });
      span.addEventListener("mouseleave", () => {
        tip.remove();
      });
      if (p.innerHTML === currentDay) {
        span.style.backgroundColor = "#76b5bc";
      }
    });
  }
};
