$(document).ready(function() {
  $("#register_btn").click(function() {
    const registerName = $("#register_name").val();
    const registerId = $("#register_id").val();
    const registerEmail = $("#register_email").val();
    const registerPhone = $("#register_phone").val();
    const registerPw = $("#register_pw").val();
    const registerPwCheck = $("#register_pw_check").val();

    if (
      registerName &&
      registerId &&
      registerEmail &&
      registerPw &&
      registerPwCheck
    ) {
      if (registerPw === registerPwCheck) {
        const sendParams = {
          registerName,
          registerId,
          registerEmail,
          registerPhone,
          registerPw
        };
        $.post("/member_insert", sendParams, function(data, status) {
          //alert(data+":"+status);
          const parsedData = JSON.parse(data);
          alert(parsedData.msg);
          $(location).attr("href", "/");
        });
      } else {
        alert("패스워드가 일치하지 않습니다. 다시 입력하세요.");
        $("#register_pw").val("");
        $("#register_pw_check").val("");
      }
    } else {
      alert("입력되지 않은 값이 있습니다. 다시 입력하세요.");
      $("#register_name").val("");
      $("#register_email").val("");
      $("#register_pw").val("");
      $("#register_pw_check").val("");
    }
  });

  $("#login_btn").click(function() {
    const loginId = $("#login_id").val();
    const loginPw = $("#login_pw").val();

    if (loginId && loginPw) {
      const sendParams = {
        loginId,
        loginPw
      };
      $.post("/login", sendParams, function(data, status) {
        const parsedData = JSON.parse(data);

        if (parsedData.loginState === true) {
          alert(parsedData.msg);
          $(location).attr("href", "/");
        } else {
          alert(parsedData.msg);
          $(location).attr("href", "/");
          $("#login_id").val("");
          $("#login_pw").val("");
        }
      });
    } else {
      alert("입력되지 않은 값이 있습니다. 다시 입력하세요.");
      $("#login_id").val("");
      $("#login_pw").val("");
    }
  });

  $("#logout_btn").click(function() {
    console.log("로그아웃");
    $.get("/logout", function(data, status) {
      const parsedData = JSON.parse(data);
      alert(parsedData.msg);
      $(location).attr("href", "/");
    });
  });

  $("#member_delete_btn").click(function() {
    if (confirm("정말 탈퇴하시겠습니까?")) {
      let pw = prompt("본인확인을 위해 비밀번호를 입력해주세요.", "");
      const send_params = {
        pw
      };
      $.post("/member_delete", send_params, function(data, status) {
        try {
          const parsedData = JSON.parse(data);
          alert(parsedData.msg);
          $(location).attr("href", "/");
        } catch (err) {
          $(location).attr("href", "/");
        }
      });
    } else {
    }
  });

  $("#donateInfoSearch_btn").click(function() {
    const searchType = $("#searchType").val();
    const donate_input = $("#donate_input").val();
    const send_params = {
      searchType,
      donate_input
    };
    $.post("/search_donateInfo", send_params, function(data, status) {
      //alert(data+":"+status);
      const parsed_data = JSON.parse(data);
      if (parsed_data.msg == "조회 결과 없음") {
        alert("기관명을 입력하세요");
      } else {
        let printData = "";
        for (key in parsed_data.msg) {
          printData += `${key}${parsed_data.msg[key]}<hr>`;
        }

        $("#carBasicInfoSearch_div").html(`${printData}`);
      }
    });
  });

  $("#item_insert_btn").click(function() {
    alert("--------");
    const item_title = $("#item_title").val();
    const item_contents = $("#item_contents").val();
    const item_price = $("#item_price").val();
    const foundation_no = $("#foundation_no").val();
    const item_img = $("input[name=uploadFile]")
      .val()
      .split("\\");
    const item_img1 = item_img[item_img.length - 1];

    if (
      item_title &&
      item_contents &&
      item_price &&
      foundation_no &&
      item_img1
    ) {
      const sendParams = {
        item_title,
        item_contents,
        item_price,
        foundation_no,
        item_img1
      };
      alert(sendParams);
      $.post("/item_insert", sendParams, function(data, status) {
        const parsedData = JSON.parse(data);
        alert(parsedData.msg);
        $("#item_title").val("");
        $("#item_contents").val("");
        $("#item_price").val("");
        $("#foundation_no").val("");
        $("input[name=uploadFile]").val("");
      });
    } else {
      alert("입력되지 않은 값이 있습니다. 다시 입력하세요.");
      $("#item_title").val("");
      $("#item_contents").val("");
      $("#item_price").val("");
      $("#foundation_no").val("");
      $("input[name=uploadFile]").val("");
    }
  });

  $("#search_item_btn").click(function() {
    $.post("/search_item", function(data, status) {
      const parsedData = JSON.parse(data);
      console.log(parsedData);

      let result = "";

      parsedData.forEach(ele => {
        result += `
                <div style=display:flex>
                <div>
                <p><img src="upload/${
                  ele.item_img
                }" width="250px" height="200px"></p></div>
                <div style= padding:30px>
                <span>상품명:</span>
                <span>${ele.item_title}</span><br>
                <span>상품내용:</span>
                <span>${ele.item_contents}</span><br>
                <span>목표기부금액:</span>
                <span>${ele.item_price}</span><br>
                <span>재단코드:</span>
                <span>${ele.foundation_no}</span><br>
                <span>
                <img style="margin-top:20px; margin-left :50px" id="item_trash_${
                  ele.no
                }" src="img/trash.png"></span></div></div>
               <hr>`;
      });

      $(document).on("click", "[id^='item_trash_']", function() {
        var id = $(this).attr("id");
        var item_no = id.replace("item_trash_", "");

        if (item_no) {
          const send_params = {
            item_no
          };
          $.post("/item_trash", send_params, function(data, status) {
            alert(JSON.parse(data).msg);
            window.location.reload(true);
          });
        } else {
          alert("정상적인 경로가 아닙니다. 다시 시도해주세요.");
        }
      });

      /* 
            let printData = "";
            for (key in parsedData.msg) {
              printData += `${key}${parsedData.msg[key]}<hr>`;
            } */
      /*  alert(parsedData.msg);
            window.location.reload(true);
          */
      $("#item_list").html(result);
    });
  });

  $("#main").click(function() {
    $("#category_result").load("/category/main.ejs");
  });
  $("#kid").click(function() {
    $("#category_result").load("/category/kid.ejs");
  });
  $("#elder").click(function() {
    $("#category_result").load("/category/elder.ejs");
  });
  $("#world").click(function() {
    $("#category_result").load("/category/world.ejs");
  });
  $("#people").click(function() {
    $("#category_result").load("/category/people.ejs");
  });
  $("#animal").click(function() {
    $("#category_result").load("/category/animal.ejs");
  });
  $("#nature").click(function() {
    $("#category_result").load("/category/nature.ejs");
  });
  $("#grandma").click(function() {
    $("#category_result").load("/category/grandma.ejs");
  });
  $("#etc").click(function() {
    $("#category_result").load("/category/etc.ejs");
  });

  $("#purchase_btn").click(function() {
    const purchasePrice = $("#purchase_price").val();
    const nameOfItem = $("#name_of_item")[0].innerText;
    console.log(nameOfItem);
    if (purchasePrice === "") {
      alert("금액창을 입력해주세요.");
    } else {
      const sendParams = {
        purchasePrice,
        nameOfItem
      };
      $.post("/item_purchase", sendParams, function(data, status) {
        const parsedData = JSON.parse(data);
        alert(parsedData.msg);
        if (parsedData.loginState) {
          $(location).attr("href", "/");
        } else {
          $(location).attr("href", "/");
        }
      });
    }
  });

  $("#put_cart").click(function() {
    const purchasePrice = $("#purchase_price").val();
    const nameOfItem = $("#name_of_item")[0].innerText;
    console.log(nameOfItem);
    if (purchasePrice === "") {
      alert("금액창을 입력해주세요.");
    } else {
      const sendParams = {
        purchasePrice,
        nameOfItem
      };
      $.post("/cart", sendParams, function(data, status) {
        const parsedData = JSON.parse(data);
        alert(parsedData.msg);
        if (parsedData.loginState) {
          $(location).attr("href", "/cart");
        } else {
          $(location).attr("href", "/");
        }
      });
    }
  });
});
