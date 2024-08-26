/**
 * DataTables Basic
 */

"use strict";





let fv, offCanvasEl;
document.addEventListener("DOMContentLoaded", function (e) {
  (function () {
    const formAddNewRecord = document.getElementById("form-add-new-record");

    setTimeout(() => {
      const newRecord = document.querySelector(".create-new"),
        offCanvasElement = document.querySelector("#add-new-record");

      // To open offCanvas, to add new record
      if (newRecord) {
        newRecord.addEventListener("click", function () {
          offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
          // Empty fields on offCanvas open

          
          $(".dt-select-door").val(0).trigger("change");
          $(".dt-select-seating-cap").val(0).trigger("change");
          (offCanvasElement.querySelector(".dt-vahical-name").value = ""),
            (offCanvasElement.querySelector(".dt-duration").value = ""),
            (offCanvasElement.querySelector(".dt-amount").value =
              ""),
            (offCanvasElement.querySelector(
              ".dt-extra-hrs"
            ).value = ""),
            $(".dt-select-luggage").val(0).trigger("change");
          (offCanvasElement.querySelector(".dt-extra-kms").value = ""),
            (offCanvasElement.querySelector(".dt-out-station-kms").value = ""),
            // Open offCanvas with form
            offCanvasEl.show();
        });
      }
    }, 200);

    // Form validation for Add new record
    fv = FormValidation.formValidation(formAddNewRecord, {
      fields: {
        vahicalName: {
          validators: {
            notEmpty: {
              message: "Vahical Name is required",
            },
            // callback: {
            //   message: "College is required",
            //   callback: function (value, validator, $field) {
            //     if (parseFloat(value.value) !== 0) {
            //       return true;
            //     }
            //     return false;
            //   },
            // },
          },
        },
        duration: {
          validators: {
            notEmpty: {
              message: "car Duration  is required",
            },
            // callback: {
            //   message: "College Type is required",
            //   callback: function (value, validator, $field) {
            //     if (parseFloat(value.value) !== null) {
            //       return true;
            //     }
            //     return false;
            //   },
            // },
          },
        },
        amount: {
          validators: {
            notEmpty: {
              message: "Amount is required",
            },
          },
        },
        extraHrs: {
          validators: {
            notEmpty: {
              message: "Society Address is required",
            },
          },
        },
        extraKms: {
          validators: {
            notEmpty: {
              message: "Extra KMS is required",
            },
          },
        },
        outStationKms: {
          validators: {
            notEmpty: {
              message: "out Station Kms is required",
            },
          },
        },
        selectDoor: {
          validators: {
            notEmpty: {
              message: "Door Number is required",
            },
            // callback: {
            //   message: "District is required",
            //   callback: function (value, validator, $field) {
            //     if (parseFloat(value.value) !== 0) {
            //       return true;
            //     }
            //     return false;
            //   },
            // },
          },
        },
        // selectSeatingCap: {
        //   validators: {
        //     notEmpty: {
        //       message: "Email is required",
        //     },
        //     emailAddress: {
        //       message: "The value is not a valid email address",
        //     },
        //   },
        // },
        selectSeatingCap: {
          validators: {
            notEmpty: {
              message: "Seating Capicity is required",
            },
          },
        },
        selectLuggage: {
          validators: {
            notEmpty: {
              message: "Luggage Number is required",
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

    
     
        // Select2 (College)
        if (formValidationSelectCollege.length) {
          formValidationSelectCollege.wrap('<div class="position-relative"></div>');
          formValidationSelectCollege
            .select2({
              placeholder: 'Select College',
              dropdownParent: formValidationSelectCollege.parent()
            }).on("change.select2", function () {
              // Revalidate the color field when an option is chosen
              fv.revalidateField("selectCollege");
            });
        }
        // Select2 (College Type)
        if (formValidationSelectCollegeType.length) {
          formValidationSelectCollegeType.wrap('<div class="position-relative"></div>');
          formValidationSelectCollegeType
            .select2({
              placeholder: 'Select College Type',
              dropdownParent: formValidationSelectCollegeType.parent()
            }).on("change.select2", function () {
              // Revalidate the color field when an option is chosen
              fv.revalidateField("selectCollegeType");
            });
        }
        // Select2 (District)
        if (formValidationSelectDistrict.length) {
          formValidationSelectDistrict.wrap('<div class="position-relative"></div>');
          formValidationSelectDistrict
            .select2({
              placeholder: 'Select District',
              dropdownParent: formValidationSelectDistrict.parent()
            }).on("change.select2", function () {
              // Revalidate the color field when an option is chosen
              fv.revalidateField("selectDistrict");
            });
        }


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
        url: "/api/get-car", // Your API endpoint
        type: "GET",
        dataSrc: function (json) {
          return json.data; // Assuming your API returns data in a "data" property
        }
      },
      columns: [
        { data: "" },
        { data: "id" },
        { data: "id" },
        { data: "car_name" },
        { data: "duration" },
        { data: "amount" },
        { data: "extra_hrs" },
        { data: "extra_kms" },
        { data: "out_station_kms" },
        { data: "doors" },
        { data: "seating_cap" },
        { data: "liggage" },
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
          visible: true,
          render: function (data, type, full, meta) {
            var $Extra_Kms = full["Extra_Kms"];
            return '<ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">'+
            '<li data-bs-toggle="tooltip" data-popup="tooltip-custom"'+
              'data-bs-placement="top" class="avatar avatar-xs pull-up" title="Lilian Fuller">'+
              '<img src="../../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" /></li>'
          }
        },
        {
          // College Name Column:

          targets: 3,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var car_name = full["car_name"];

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center user-name">' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              car_name +
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
          // director_mobile_no
          targets: -6,
          render: function (data, type, full, meta) {
            var $extra_kms = full["extra_kms"];

            return "<span>" + $extra_kms + "</span>";
          },
        },
        {
          // vice_principal_no
          targets: -2,
          render: function (data, type, full, meta) {
            var $luggage = full["luggage"];

            return "<span>" + $luggage + "</span>";
          },
        },

        {
          // principal_mobile_no
          targets: -4,
          render: function (data, type, full, meta) {
            var $doors = full["doors"];

            return "<span>" + $doors + "</span>";
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
                columns: [3, 4, 5, 6, 7, 8, 9 ,10 , 11],
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
                columns: [3, 4, 5, 6, 7,8,9,10,11],
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
                columns: [3, 4, 5, 6, 7, 8, 9, 10, 11],
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
                columns: [3, 4, 5, 6, 7, 8, 9, 10, 11],
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
                columns: [3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    $("div.head-label").html('<h5 class="card-title mb-0">College List</h5>');
  }

  // Add New record
  // ? Remove/Update this code as per your requirements
  // var count = 101;
  // // On form submit, if form is valid
  // fv.on("core.form.valid", function () {

  //   var $Vehicle_Name = $(".add-new-record .dt-vahical-name").val(),
  //     $duration = $(".add-new-record .dt-duration").val(),
  //     $Amount = $(".add-new-record .dt-amount").val(),
  //     $Extra_Hrs = $(".add-new-record .dt-extra-hrs").val(),
  //     $Extra_Kms = $(".add-new-record .dt-extra-kms").val(),
  //     $Out_Station_Kms = $(
  //       ".add-new-record .dt-out-station-kms"
  //     ).val(),
  //     $Doors = $(".add-new-record .dt-select-door").val(),
  //     $Seating_Cap = $(".add-new-record .dt-select-seating-cap").val(),
  //     $Luggage = $(".add-new-record .dt-select-luggage").val()
      

  //   if ($Vehicle_Name != "") {
  //     dt_basic.row
  //       .add({
  //         id: count,
  //         Vehicle_Name: $Vehicle_Name,
  //         duration: $duration,
  //         Amount: $Amount,
  //         Extra_Hrs: $Extra_Hrs,
  //         Extra_Kms: $Extra_Kms,
  //         Out_Station_Kms: $Out_Station_Kms,
  //         Doors: $Doors,
  //         Seating_Cap: $Seating_Cap,
  //         Luggage: $Luggage,
  //       })
  //       .draw();
  //     count++;

  //     // Hide offcanvas using javascript method
  //     offCanvasEl.hide();
  //   }
  // });

// ...

// Add New record
// ? Remove/Update this code as per your requirements
var count = 101;
// On form submit, if form is valid
fv.on("core.form.valid", function () {
  var $Vehicle_Name = $(".add-new-record .dt-vahical-name").val(),
    $duration = $(".add-new-record .dt-duration").val(),
    $Amount = $(".add-new-record .dt-amount").val(),
    $Extra_Hrs = $(".add-new-record .dt-extra-hrs").val(),
    $Extra_Kms = $(".add-new-record .dt-extra-kms").val(),
    $Out_Station_Kms = $(".add-new-record .dt-out-station-kms").val(),
    $Doors = $(".add-new-record .dt-select-door").val(),
    $Seating_Cap = $(".add-new-record .dt-select-seating-cap").val(),
    $Luggage = $(".add-new-record .dt-select-luggage").val()

  // Make AJAX request to your API endpoint
  $.ajax({
    type: "POST",
    url: "/api/add-car",
    data: {
      Vehicle_Name: $Vehicle_Name,
      duration: $duration,
      Amount: $Amount,
      Extra_Hrs: $Extra_Hrs,
      Extra_Kms: $Extra_Kms,
      Out_Station_Kms: $Out_Station_Kms,
      Doors: $Doors,
      Seating_Cap: $Seating_Cap,
      Luggage: $Luggage,
    },
    success: function (data) {
      // Update the DataTable with the new data
      dt_basic.row.add({
        id: count,
        Vehicle_Name: $Vehicle_Name,
        duration: $duration,
        Amount: $Amount,
        Extra_Hrs: $Extra_Hrs,
        Extra_Kms: $Extra_Kms,
        Out_Station_Kms: $Out_Station_Kms,
        Doors: $Doors,
        Seating_Cap: $Seating_Cap,
        Luggage: $Luggage,
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
