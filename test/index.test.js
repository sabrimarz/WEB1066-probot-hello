const {
Application
} = require('probot')

const myProbotApp = require('..')
const issuesOpenedPayload = require('./fixtures/issues.opened.json')
const checkRunCompletedPayload = require('./fixtures/check_run.completed.json')
test('that we can run tests', () => {
  expect(1 + 2 + 3).toBe(6)
})
describe('My Probot app', () => {
  let app, github
  beforeEach(() => {
    app = new Application()
    app.load(myProbotApp)
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    app.auth = () => Promise.resolve(github)
  })
  test('creates a comment when an issue is opened', async() => {
    await app.receive({
      event: 'issues.opened',
      payload: issuesOpenedPayload
    })
    expect(github.issues.createComment).toHaveBeenCalled()
  })
  test('process check_run completed event', async() => {
    await app.receive({
      name: 'check_run.completed',
      payload: checkRunCompletedPayload
    })
  })
})
