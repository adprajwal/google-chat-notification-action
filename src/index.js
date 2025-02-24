const core = require('@actions/core');
const JobStatus = require('./parseStatus');
const GoogleChat = require('./notificationCard');

const run = async () => {
  try {
    const name = core.getInput('name', { required: true });
    const url = core.getInput('url', { required: true });
    const status = JobStatus.parse(core.getInput('status', { required: true }));
    const customText = core.getInput('custom_text', { required: false });

    console.log(
      `input params: name=${name}, ` +
        `status=${status}, ` +
        `url=${url}, ` +
        `custom_text=${customText}`
    );

    await GoogleChat.notificationCard(name, url, status, customText);
    console.log('Sent message.');
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
