const surveysDao = require('./SurveysDao');

class SurveysService {
  async getSurveys() {
    const surveys = await surveysDao.getSurveys();
    console.log('surveys:', surveys);
    return surveys;
  };
};

module.exports = new SurveysService();