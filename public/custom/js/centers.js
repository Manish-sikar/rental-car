/**
 * DataTables Basic
 */

"use strict";


document.addEventListener('DOMContentLoaded', function() {
  // Make an AJAX request to the API to get the enquiry data
  fetch('/api/total-count-enquiry')
      .then(response => response.json())
      .then(data => {
          // Assuming the data contains totalEnquiry, todayEnquiry, yesterdayEnquiry
          const { total_enquiry, today_total_enquiry, yesterday_total_enquiry } = data.data[0];
          // Update the HTML elements with the fetched data
          document.getElementById('totalEnquiry').textContent = total_enquiry;
          document.getElementById('todayEnquiry').textContent = today_total_enquiry;
          document.getElementById('yesterdayEnquiry').textContent = yesterday_total_enquiry;
      })
      .catch(error => console.error('Error fetching enquiry data:', error));
});



let fv, offCanvasEl;
document.addEventListener("DOMContentLoaded", function (e) {
  (function () {
    const formAddNewRecord = document.getElementById("form-add-new-record");

    setTimeout(() => {
      const newRecord = document.querySelector(".create-new"),
        offCanvasElement = document.querySelector("#add-new-record");

      // Hide the Pratical Element
      $("#minPracticalMarksEle").hide();
      $("#maxPracticalMarksEle").hide();

      // To open offCanvas, to add new record
      if (newRecord) {
        newRecord.addEventListener("click", function () {
          offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
          // Empty fields on offCanvas open
          (offCanvasElement.querySelector(".dt-name").value = ""),
            (offCanvasElement.querySelector(".dt-car").value = ""),
            (offCanvasElement.querySelector(".dt-phone").value = ""),
            (offCanvasElement.querySelector(".dt-email").value = ""),
            (offCanvasElement.querySelector(".dt-message").value = "")
          // Open offCanvas with form
          offCanvasEl.show();
        });
      }
    }, 200);

    // Form validation for Add new record
    fv = FormValidation.formValidation(formAddNewRecord, {
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: "The  name is required",
            },
          },
        },
        car: {
          validators: {
            notEmpty: {
              message: "car name  is required",
            },
          },
        },
        Phone: {
          validators: {
            notEmpty: {
              message: "Phone Number is required",
            },
          },
        },
        email: {
          validators: {
            notEmpty: {
              message: "email is required",
            },
          },
        },
        message: {
            validators: {
              notEmpty: {
                message: "Message is required",
              },
            },
          },
        
      },

      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: "",
          rowSelector: ".col-sm-12",
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus(),
      },
      init: (instance) => {
        instance.on("plugins.message.placed", function (e) {
          if (e.element.parentElement.classList.contains("input-group")) {
            e.element.parentElement.insertAdjacentElement(
              "afterend",
              e.messageElement
            );
          }
        });
      },
    });

    fv.disableValidator("minPracticalMarks").disableValidator(
      "maxPracticalMarks"
    );
  })();
});

// datatable (jquery)
$(function () {
  var dt_basic_table = $(".datatables-basic"),
    dt_basic;

  // DataTable with buttons
  // --------------------------------------------------------------------

 
  if (dt_basic_table.length) {
    dt_basic = dt_basic_table.DataTable({
      ajax: {
        url: "/api/get-rider-enquiry", // Your API endpoint
        type: "GET",
        dataSrc: function (json) {
          return json.data; // Assuming your API returns data in a "data" property
        }
      },
      columns: [
        { data: "" },
        { data: "id" },
        { data: "id" },
        { data: "name" },
        { data: "car" },
        { data: "phone" },
        { data: "email" },
        { data: "message" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
        },
        {
          // Hides the second column (ID column).
          targets: 2,
          searchable: false,
          visible: false,
        },
        {
          // User Name Column:

          targets: 3,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var name = full["name"];

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center user-name">' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              name +
              "</span>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          responsivePriority: 1,
          targets: 4,
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $message = full["message"];

            return "<span>" + $message + "</span>";
          },
        },
        {
          // Label
          targets: -3,
          render: function (data, type, full, meta) {
            var $email = full["email"];

            return "<span>" + $email + "</span>";
          },
        },
        {
          // Label
          targets: -4,
          render: function (data, type, full, meta) {
            var $phone = full["phone"];

            return "<span>" + $phone + "</span>";
          },
        },

        {
          // Actions Column
          targets: -1,
          title: "Actions",
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="text-primary ti ti-dots-vertical"></i></a>' +
              '<ul class="dropdown-menu dropdown-menu-end m-0">' +
              '<li><a href="javascript:;" class="dropdown-item">Details</a></li>' +
              '<div class="dropdown-divider"></div>' +
              '<li><a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a></li>' +
              "</ul>" +
              "</div>" +
              '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="text-primary ti ti-pencil"></i></a>'
            );
          },
        },
      ],
      // Sets the default order of the table based on the third column (ID column).
      order: [[2, "desc"]],
      // Defines the DOM structure for the DataTable layout.
      dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      // Configures export buttons for the table data and an "Add New Record" button.
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-primary dropdown-toggle me-2",
          text: '<i class="ti ti-file-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
          buttons: [
            {
              extend: "print",
              text: '<i class="ti ti-printer me-1" ></i>Print',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";

                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });

                    return result;
                  },
                },
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css("color", config.colors.headingColor)
                  .css("border-color", config.colors.borderColor)
                  .css("background-color", config.colors.bodyBg);
                $(win.document.body)
                  .find("table")
                  .addClass("compact")
                  .css("color", "inherit")
                  .css("border-color", "inherit")
                  .css("background-color", "inherit");
              },
            },
            {
              extend: "csv",
              text: '<i class="ti ti-file-text me-1" ></i>Csv',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "excel",
              text: '<i class="ti ti-file-spreadsheet me-1"></i>Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "pdf",
              text: '<i class="ti ti-file-description me-1"></i>Pdf',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4, 5 ,6 , 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "copy",
              text: '<i class="ti ti-copy me-1" ></i>Copy',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
          ],
        },
        {
          text: '<i class="ti ti-plus me-sm-1"></i> <span class="d-none d-sm-inline-block">Add New Record</span>',
          className: "create-new btn btn-primary",
        },
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["subject_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    "<td>" +
                    col.title +
                    ":" +
                    "</td> " +
                    "<td>" +
                    col.data +
                    "</td>" +
                    "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
    });
    $("div.head-label").html('<h5 class="card-title mb-0">Centers</h5>');
  }

  // Add New record
  // ? Remove/Update this code as per your requirements
  var count = 101;
  // On form submit, if form is valid
  fv.on("core.form.valid", function () {
    var $name = $(".add-new-record .dt-name").val(),
      $car = $(".add-new-record .dt-car").val(),
      $phone = $(".add-new-record .dt-phone").val(),
      $email = $(".add-new-record .dt-email").val(),
      $message = $(".add-new-record .dt-message").val()

 $.ajax({
  type: "POST",
  url: "/api/rider-enquiry",
  data: {
    name: $name,
          car: $car,
          phone: $phone,
          email: $email,
          message: $message
  },
  success: function (data) {
    // Update the DataTable with the new data
    dt_basic.row.add({
      id: count,
      name: $name,
            car: $car,
            phone: $phone,
            email: $email,
            message: $message
    }).draw();
    count++;

    // Hide offcanvas using javascript method
    offCanvasEl.hide();
  },
  error: function (xhr, status, error) {
    console.error(xhr, status, error);
  },
});
});


  // Delete Record
  $(".datatables-basic tbody").on("click", ".delete-record", function () {
    dt_basic.row($(this).parents("tr")).remove().draw();
  });

  // Delete Record
  $("#showPracticalElement").change(function () {
    if ($(this).is(":checked")) {
      fv.enableValidator("minPracticalMarks").enableValidator(
        "maxPracticalMarks"
      );
      $("#minPracticalMarksEle").show();
      $("#maxPracticalMarksEle").show();
    } else {
      fv.disableValidator("minPracticalMarks").disableValidator(
        "maxPracticalMarks"
      );
      $("#minPracticalMarksEle").hide();
      $("#maxPracticalMarksEle").hide();
    }
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);
});
