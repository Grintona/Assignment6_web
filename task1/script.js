var initialPartyData = [
  {
    id: "balcony",
    name: "Balcony",
    floor: 2,
    guests: [
      { name: "Aigerim", color: "green", time: "20:45", isAitu: true, things: ["cup", "crumbs"] },
      { name: "Aliya", color: "black", time: "21:15", isAitu: false, things: ["phone", "cup"] },
      { name: "Madina", color: "green", time: "22:10", isAitu: false, things: ["phone", "bag", "crumbs"] },
      { name: "Ivan", color: "black", time: "20:10", isAitu: true, things: ["cup"] }
    ]
  },
  {
    id: "hall",
    name: "Hall",
    floor: 2,
    guests: [
      { name: "Arman", color: "yellow", time: "20:35", isAitu: false, things: ["bag", "glasses"] },
      { name: "Sophia", color: "purple", time: "21:20", isAitu: true, things: ["phone"] },
      { name: "Dias", color: "green", time: "19:45", isAitu: true, things: [] },
      { name: "Bekzat", color: "purple", time: "20:55", isAitu: false, things: ["bag", "cup", "crumbs"] },
      { name: "Aruzhan", color: "blue", time: "21:50", isAitu: true, things: ["phone"] },
      { name: "Saule", color: "green", time: "21:25", isAitu: false, things: ["glasses"] }
    ]
  },
  {
    id: "kitchen",
    name: "Kitchen",
    floor: 1,
    guests: [
      { name: "Nurlan", color: "red", time: "19:40", isAitu: true, things: ["phone", "cup"] },
      { name: "Emma", color: "black", time: "20:15", isAitu: false, things: ["bag"] },
      { name: "Timur", color: "green", time: "21:05", isAitu: true, things: ["phone", "bag", "crumbs"] },
      { name: "Sergey", color: "yellow", time: "20:50", isAitu: false, things: [] },
      { name: "Yerlan", color: "red", time: "21:40", isAitu: true, things: ["glasses", "phone"] },
      { name: "Kamila", color: "green", time: "20:05", isAitu: false, things: ["cup"] }
    ]
  },
  {
    id: "living-room",
    name: "Living room",
    floor: 1,
    guests: [
      { name: "Daniel", color: "blue", time: "19:55", isAitu: true, things: ["glasses"] },
      { name: "Zarina", color: "green", time: "21:10", isAitu: false, things: ["bag", "phone", "crumbs"] },
      { name: "Natasha", color: "yellow", time: "20:30", isAitu: true, things: [] },
      { name: "Askar", color: "black", time: "21:00", isAitu: true, things: ["phone"] },
      { name: "Inkar", color: "purple", time: "20:20", isAitu: false, things: ["bag"] }
    ]
  }
];

var thingSvgs = {
  phone: '<svg class="thing-icon icon-phone" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>',
  glasses: '<svg class="thing-icon icon-glasses" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2"><circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
  bag: '<svg class="thing-icon icon-bag" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2"><path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  cup: '<svg class="thing-icon icon-cup" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2"><path d="M4 6h12v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6z"/><path d="M16 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/></svg>',
  crumbs: '<svg class="thing-icon icon-crumbs" viewBox="0 0 24 24" fill="#8b4513"><circle cx="4" cy="16" r="2"/><circle cx="10" cy="12" r="1.5"/><circle cx="16" cy="15" r="2"/><circle cx="20" cy="10" r="1.5"/></svg>'
};

function createGuestCard(guest, roomName, floorNum) {
  var classes = ["guest", "color-" + guest.color];
  if (guest.isAitu) {
    classes.push("is-aitu");
  }
  for (var i = 0; i < guest.things.length; i++) {
    classes.push("has-" + guest.things[i]);
  }

  var $card = $("<div></div>")
    .addClass(classes.join(" "))
    .attr("data-name", guest.name)
    .attr("data-time", guest.time)
    .attr("data-color", guest.color)
    .attr("data-aitu", guest.isAitu ? "true" : "false")
    .attr("data-room", roomName || "")
    .attr("data-floor", floorNum || "")
    .attr("data-things", guest.things.join(" "));

  var $avatarWrapper = $("<div></div>").addClass("avatar-wrapper");
  var avatarSrc = "avatars/" + guest.name + ".svg";
  var $img = $("<img>")
    .addClass("avatar-img color-ring-" + guest.color)
    .attr("src", avatarSrc)
    .attr("alt", guest.name)
    .on("error", function() {
      $(this).attr("src", "https://api.dicebear.com/9.x/open-peeps/svg?seed=" + guest.name);
    });

  $avatarWrapper.append($img);

  if (guest.isAitu) {
    var $badge = $("<div></div>").addClass("aitu-badge").text("AITU");
    $avatarWrapper.append($badge);
  }

  var $name = $("<div></div>").addClass("guest-name").text(guest.name);
  var $time = $("<div></div>").addClass("guest-time").text(guest.time);
  var $things = $("<div></div>").addClass("guest-things");

  for (var j = 0; j < guest.things.length; j++) {
    var thing = guest.things[j];
    if (thingSvgs[thing]) {
      $things.append(thingSvgs[thing]);
    }
  }

  $card.append($avatarWrapper, $name, $time, $things);
  return $card;
}

function buildParty() {
  for (var r = 0; r < initialPartyData.length; r++) {
    var room = initialPartyData[r];
    var $roomContainer = $("#" + room.id + " .guest-list");
    $roomContainer.empty();
    for (var g = 0; g < room.guests.length; g++) {
      var guest = room.guests[g];
      var $card = createGuestCard(guest, room.name, room.floor);
      $roomContainer.append($card);
    }
  }
}

var casesData = {
  1: {
    title: "Case 1: Who is in the hall?",
    chain: '$("#hall").find(".guest")',
    run: function() {
      return $("#hall").find(".guest");
    }
  },
  2: {
    title: "Case 2: Who is dressed in yellow or purple?",
    chain: '$(".guest.color-yellow, .guest.color-purple")',
    run: function() {
      return $(".guest.color-yellow, .guest.color-purple");
    }
  },
  3: {
    title: "Case 3: Which AITU students are upstairs?",
    chain: '$("#floor-2").find(".guest.is-aitu")',
    run: function() {
      return $("#floor-2").find(".guest.is-aitu");
    }
  },
  4: {
    title: "Case 4: Who has glasses or a bag?",
    chain: '$(".guest.has-glasses, .guest.has-bag")',
    run: function() {
      return $(".guest.has-glasses, .guest.has-bag");
    }
  },
  5: {
    title: "Case 5: Who came with nothing at all?",
    chain: '$(".guest:not(:has(.thing-icon))")',
    run: function() {
      return $(".guest:not(:has(.thing-icon))");
    }
  },
  6: {
    title: "Case 6: Who has a phone but no bag?",
    chain: '$(".guest.has-phone:not(.has-bag)")',
    run: function() {
      return $(".guest.has-phone:not(.has-bag)");
    }
  },
  7: {
    title: "Case 7: Who arrived between 20:30 and 21:00, both times included?",
    chain: '$(".guest").filter(function() { var t = $(this).attr("data-time"); return t >= "20:30" && t <= "21:00"; })',
    run: function() {
      return $(".guest").filter(function() {
        var t = $(this).attr("data-time");
        return t >= "20:30" && t <= "21:00";
      });
    }
  },
  8: {
    title: "Case 8: Who arrived after 21:00 and is not an AITU student?",
    chain: '$(".guest:not(.is-aitu)").filter(function() { return $(this).attr("data-time") > "21:00"; })',
    run: function() {
      return $(".guest:not(.is-aitu)").filter(function() {
        return $(this).attr("data-time") > "21:00";
      });
    }
  },
  9: {
    title: "Case 9: Who stands right next to Askar?",
    chain: '$(".guest[data-name=\'Askar\']").prev(".guest").add($(".guest[data-name=\'Askar\']").next(".guest"))',
    run: function() {
      return $(".guest[data-name='Askar']").prev(".guest").add($(".guest[data-name='Askar']").next(".guest"));
    }
  },
  10: {
    title: "Case 10: Who stands last in each room?",
    chain: '$(".room .guest:last-child")',
    run: function() {
      return $(".room .guest:last-child");
    }
  },
  11: {
    title: "Case 11: Who stands third in each room?",
    chain: '$(".room .guest:nth-child(3)")',
    run: function() {
      return $(".room .guest:nth-child(3)");
    }
  },
  12: {
    title: "Case 12: Who stands after Timur in his room?",
    chain: '$(".guest[data-name=\'Timur\']").nextAll(".guest")',
    run: function() {
      return $(".guest[data-name='Timur']").nextAll(".guest");
    }
  },
  13: {
    title: "Case 13: Who stands right before someone in black?",
    chain: '$(".guest.color-black").prev(".guest")',
    run: function() {
      return $(".guest.color-black").prev(".guest");
    }
  },
  14: {
    title: "Case 14: In which room is Aruzhan?",
    chain: '$(".guest[data-name=\'Aruzhan\']").closest(".room")',
    run: function() {
      return $(".guest[data-name='Aruzhan']").closest(".room");
    }
  },
  15: {
    title: "Case 15: Which rooms have fewer than 6 guests?",
    chain: '$(".room").filter(function() { return $(this).find(".guest").length < 6; })',
    run: function() {
      return $(".room").filter(function() {
        return $(this).find(".guest").length < 6;
      });
    }
  },
  16: {
    title: "Case 16: In which rooms does somebody have a cup, but nobody wears glasses?",
    chain: '$(".room:has(.has-cup):not(:has(.has-glasses))")',
    run: function() {
      return $(".room:has(.has-cup):not(:has(.has-glasses))");
    }
  },
  17: {
    title: "Case 17: Who came first to each room?",
    chain: '$(".room .guest").filter(function() { var myTime = $(this).attr("data-time"); return $(this).siblings(".guest").filter(function() { return $(this).attr("data-time") < myTime; }).length === 0; })',
    run: function() {
      return $(".room .guest").filter(function() {
        var myTime = $(this).attr("data-time");
        return $(this).siblings(".guest").filter(function() {
          return $(this).attr("data-time") < myTime;
        }).length === 0;
      });
    }
  },
  18: {
    title: "Case 18: Miras joins Askar and Inkar",
    chain: 'createGuestCard({ name: "Miras", color: "blue", time: "21:20", isAitu: true, things: ["phone"] }).hide().insertAfter($(".guest[data-name=\'Askar\']")).fadeIn(600)',
    run: function() {
      var mirasData = { name: "Miras", color: "blue", time: "21:20", isAitu: true, things: ["phone"] };
      var $miras = createGuestCard(mirasData, "Living room", 1);
      $miras.hide().insertAfter($(".guest[data-name='Askar']")).fadeIn(600);
      return $miras;
    }
  },
  19: {
    title: "Case 19: Natasha says goodbye and goes home",
    chain: '$(".guest[data-name=\'Natasha\']").fadeOut(600, function() { $(this).remove(); })',
    run: function() {
      var $natasha = $(".guest[data-name='Natasha']");
      $natasha.fadeOut(600, function() {
        $(this).remove();
      });
      return $natasha;
    }
  },
  20: {
    title: "Case 20: Who took the cake?",
    chain: '$("#floor-1 .guest.has-crumbs:not(.has-cup)").filter(function() { var t = $(this).attr("data-time"); var nextOrPrevAitu = $(this).prev(".is-aitu").length > 0 || $(this).next(".is-aitu").length > 0; return t > "21:00" && t < "21:30" && nextOrPrevAitu; })',
    run: function() {
      return $("#floor-1 .guest.has-crumbs:not(.has-cup)").filter(function() {
        var t = $(this).attr("data-time");
        var nextOrPrevAitu = $(this).prev(".is-aitu").length > 0 || $(this).next(".is-aitu").length > 0;
        return t > "21:00" && t < "21:30" && nextOrPrevAitu;
      });
    }
  }
};

function executeCase(caseNum) {
  buildParty();
  $(".highlight").removeClass("highlight");
  $(".case-btn").removeClass("active");
  $(".case-btn[data-case='" + caseNum + "']").addClass("active");

  var c = casesData[caseNum];
  if (!c) {
    return;
  }

  var $found = c.run();

  if ($found && $found.length > 0) {
    $found.addClass("highlight");
    if ($found.hasClass("guest")) {
      $found.css("position", "relative")
        .animate({ top: "-15px" }, 180)
        .animate({ top: "0px" }, 180);
    } else if ($found.hasClass("room")) {
      $found.animate({ opacity: 0.6 }, 180).animate({ opacity: 1 }, 180);
    }
  }

  var names = [];
  $found.each(function() {
    var name = $(this).attr("data-name");
    if (!name) {
      name = $(this).find(".room-header").text();
    }
    if (name) {
      names.push(name);
    }
  });

  $("#results-panel").show();
  $("#results-title").text(c.title);
  $("#results-chain").text(c.chain);
  $("#results-count").text("Found: " + $found.length + ($found.hasClass("room") ? " room(s)" : " guest(s)"));
  $("#results-names").text("Names: " + (names.length > 0 ? names.join(", ") : "None"));
}

$(document).ready(function() {
  buildParty();

  $(".case-btn").on("click", function() {
    var num = parseInt($(this).attr("data-case"), 10);
    executeCase(num);
  });

  $("#btn-reset").on("click", function() {
    buildParty();
    $(".highlight").removeClass("highlight");
    $(".case-btn").removeClass("active");
    $("#results-panel").hide();
  });
});
