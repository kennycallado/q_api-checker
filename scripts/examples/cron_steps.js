switch (user.record.step) {
  case 1:
    if (!user.paper.complete) {
      if (user.record.strike) user.record.strike = user.record.strike + 1;
      if (user.record.strike > 3) user.send_message(2);

      break;
    }
    delete user.record.strike;

    user.resource_complete(user.paper.resource_id);
    user.add_resource(20);
    user.record.step = 2;
    break;

  default:
    user.record.step = 1;
    user.add_resource(10);
    user.send_message(1)
    break;
}
