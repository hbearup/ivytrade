var model = {
	jsonUser: "",
	jsonItems: "",
	loggedIn: false,
	userIndex: -1,
	user: "",
	pass: "",
	email: "",
	college: "",
	addr: "",
	city: "",
	state: "",
	zip: "",
	userIndex: -1
};

function updateView()
{
	model.userIndex = model.jsonUser[0][0];
	model.user = model.jsonUser[0][1];
	model.pass = model.jsonUser[0][2];
	model.email = model.jsonUser[0][3];
	model.college = model.jsonUser[0][4];
	model.addr = model.jsonUser[0][5];
	model.city = model.jsonUser[0][6];
	model.state = model.jsonUser[0][7];
	model.zip = model.jsonUser[0][8];

	if(model.loggedIn == true)
	{
		$("#greetings").text("Welcome back, " + model.user + "!");
		$("#content").text("");
		$("#content").append("<h2>" + model.user + "'s Listed Items</h2>");
		$("#content").append("<button type='button' class='btn btn-default' id='newItem'><a data-toggle='modal' data-target='#addItemModal' href='#' data-dismiss='modal'>List a New Item</a></button><br><br>");
	}
	populate(model.userIndex);
}

function category(cat)
{
	var posting = $.post("ivy.php",
			{cmd: "category", cat: cat});

	posting.done(function(ret)
	{
		$("#content").append("<div class='row'><div class='col-md-12' id='boxes'></div></div>");

		for(var i in ret)
		{
			var mod = i % 3;
			console.log(mod);
			if(mod == 2)
			{
				$("#boxes").append("<div class='row'><div class='itemBox col-md-4'><p><center><img src='uploads/" + ret[i][8] + "'></center><br><b>Item Name:</b> " + ret[i][2] + "<br><b>Category:</b> " + ret[i][3] + "<br><b>Price:</b> $" +  ret[i][4] + "<br><b>Date Listed:</b> " +  ret[i][5] + "<br><b>Expires:</b> " +  ret[i][6] + "<br><b>Description:</b> " +  ret[i][7] + "</p></div>");
			}
			else if(mod == 1)
			{
				$("#boxes").append("<div class='itemBox col-md-4'><p><center><img src='uploads/" + ret[i][8] + "'></center><br><b>Item Name:</b> " + ret[i][2] + "<br><b>Category:</b> " + ret[i][3] + "<br><b>Price:</b> $" +  ret[i][4] + "<br><b>Date Listed:</b> " +  ret[i][5] + "<br><b>Expires:</b> " +  ret[i][6] + "<br><b>Description:</b> " +  ret[i][7] + "</p></div></div>");
			}
			else
			{
				$("#boxes").append("<div class='itemBox col-md-4'><p><center><img src='uploads/" + ret[i][8] + "'></center><br><b>Item Name: </b>" + ret[i][2] + "<br><b>Category:</b> " + ret[i][3] + "<br><b>Price:</b> $" +  ret[i][4] + "<br><b>Date Listed:</b> " +  ret[i][5] + "<br><b>Expires:</b> " +  ret[i][6] + "<br><b>Description:</b> " +  ret[i][7] + "</p></div>");
			}
		}
	});
	posting.fail(function(ret)
	{
		$("#content").append("<p>No items are currently listed under this category.");
	});
}

function populate(index)
{
	var posting = $.post("ivy.php", 
			{cmd: "populate", index: index});

	posting.done(function(ret)
	{
		model.jsonItems = ret;
		
		$("#content").append("<div class='row'><div class='col-md-12' id='boxes'></div></div>");

		for(var i in ret)
		{
			var mod = i % 3;
			console.log("mod = " + mod);
			if(mod == 2)
			{
				$("#boxes").append("<div class='row'><div class='itemBox col-md-4'><p><center><img src='uploads/" + ret[i][8] + "'></center><br><b>Item Name:</b> " + model.jsonItems[i][2] + "<br><b>Category:</b> " + model.jsonItems[i][3] + "<br><b>Price:</b> $" +  model.jsonItems[i][4] + "<br><b>Date Listed:</b> " +  model.jsonItems[i][5] + "<br><b>Expires:</b> " +  model.jsonItems[i][6] + "<br><b>Description:</b> " +  model.jsonItems[i][7] + "</p></div>");
				console.log("new row");
			}
			else if(mod == 1)
			{
				$("#boxes").append("<div class='itemBox col-md-4'><p><center><img src='uploads/" + ret[i][8] + "'></center><br><b>Item Name:</b> " + model.jsonItems[i][2] + "<br><b>Category:</b> " + model.jsonItems[i][3] + "<br><b>Price:</b> $" +  model.jsonItems[i][4] + "<br><b>Date Listed:</b> " +  model.jsonItems[i][5] + "<br><b>Expires:</b> " +  model.jsonItems[i][6] + "<br><b>Description:</b> " +  model.jsonItems[i][7] + "</p></div></div>");
				console.log("closing row");
			}
			else
			{
				$("#boxes").append("<div class='itemBox col-md-4'><p><center><img src='uploads/" + ret[i][8] + "'></center><br><b>Item Name:</b> " + model.jsonItems[i][2] + "<br><b>Category:</b> " + model.jsonItems[i][3] + "<br><b>Price:</b> $" +  model.jsonItems[i][4] + "<br><b>Date Listed:</b> " +  model.jsonItems[i][5] + "<br><b>Expires:</b> " +  model.jsonItems[i][6] + "<br><b>Description:</b> " +  model.jsonItems[i][7] + "</p></div>");
			}
		}
	});
	posting.fail(function(ret)
	{
		console.log("something is not right");
	});
}

$(document).ready(function ()
{
	$(".link li").click(function()
	{
		var cat = $(this).text();
		$("#content").text("");
		$("#content").append("<h2>" + cat + "</h2>");
		category(cat);
	});

	$("#loginForm").submit(function()
	{
		var u = $("#username").val();
		var p = $("#password").val();

		var posting = $.post("ivy.php", 
				{cmd: "login", user: u, pass: p});

		posting.done(function(ret)
		{
			$("#loginModal").modal('hide');
			model.jsonUser = ret;
			model.loggedIn = true;
			updateView();
		});
		posting.fail(function(ret)
		{
			$("#loginGreet").text("Incorrect username or password.");
		});

		$("#username").val("");
		$("#password").val("");

		return false;
	});

	$("#addItemForm").submit(function()
	{
		var name = $("#itemName").val();
		var price = $("#itemPrice").val();
		var cat = $("#itemCategory").val();
		var desc = $("#itemDesc").val();

		var formdata = new FormData(this);
		formdata.append('index', model.userIndex );

		$.ajax(
		{
			url: "upload.php",
			type: "POST",
			data: formdata,
			mimeType:"multipart/form-data",
            contentType: false,
            cache: false,
            processData:false,
            success: function(data, textStatus, jqXHR)
            {
                $("#multi-msg").html('<pre><code>'+data+'</code></pre>');
                $("#addItemModal").modal('hide');
				console.log("itemAdded");
				model.jsonItems = data;
				console.log(data);
				updateView();
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
                $("#multi-msg").html('<pre><code class="prettyprint">AJAX Request Failed<br/> textStatus='+textStatus+', errorThrown='+errorThrown+'</code></pre>');
            }           
		});
		return false;
	});
});

// git git git