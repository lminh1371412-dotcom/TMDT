// Thêm "active" vào admin-sidebar__list-item dựa vào chỉ số trang
const sidebarListItems = document.querySelectorAll(".admin-sidebar__list-item");
sidebarListItems[0].classList.add("active");

Apex.grid = {
  padding: {
    right: 0,
    left: 0,
  },
};

Apex.dataLabels = {
  enabled: false,
};
var donutChart;

fetch("/admin/dashboard/getChart")
  .then((res) => res.json())
  .then((res) => {
    // Bar Chart: Đơn hàng mới
    const data = res.chartRevenueData;
    const categories = data.map((i) => i.month);
    const paid = data.map((i) => i.order_paid);
    const cancel = data.map((i) => i.order_cancel);

    var optionsBar = {
      series: [
        {
          name: "Đã thanh toán",
          data: paid,
        },
        {
          name: "Đã hủy",
          data: cancel,
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: categories,
      },
    };
    new ApexCharts(document.querySelector("#bar"), optionsBar).render();

    // Donut Chart: Doanh thu trên danh mục sản phẩm
    const catData = res.chartCategoryData;
    const labels = catData.map((i) => i.category_name);
    const series = catData.map((i) => Number(i.revenue)); // Ensure numbers

    var optionDonut = {
      chart: {
        type: "donut",
        width: "100%",
        height: 400,
      },
      series: series,
      labels: labels,
      legend: {
        position: "bottom",
      },
    };

    donutChart = new ApexCharts(document.querySelector("#donut"), optionDonut);
    donutChart.render();
  });

// on smaller screen, change the legends position for donut
var mobileDonut = function () {
  if (donutChart) {
    if ($(window).width() < 768) {
      donutChart.updateOptions(
        {
          legend: {
            position: "bottom",
          },
        },
        false,
        false
      );
    } else {
      donutChart.updateOptions(
        {
          legend: {
            position: "left",
          },
        },
        false,
        false
      );
    }
  }
};

$(window).resize(function () {
  mobileDonut();
});
