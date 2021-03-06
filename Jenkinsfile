#!groovy

node {

  // Variables
  def tokens = "${env.JOB_NAME}".tokenize('/')
  def appName = tokens[0]
  def dockerUsername = "${DOCKER_USERNAME}"
  def imageTag = "${dockerUsername}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  currentBuild.result = "SUCCESS"

  def secretKey = UUID.randomUUID().toString().replaceAll('-','')

  checkout scm
  properties([pipelineTriggers([[$class: 'GitHubPushTrigger']])])

  def cw_files_prefix = 'climatewatch.org/staging.climatewatch.org/climate-watch/'
  def user_report_key = 'cf0fa021-d239-457b-bb99-e9ab0205134c'
  def user_survey_spreadsheet = 'https://script.google.com/macros/s/AKfycbzgN1G9IdLYO3KqlTC4gzBxR1UTX5bYXu1qRaiRn1oD9qoaq6s/exec'
  def user_newsletter = 'https://connect.wri.org/l/120942/2021-01-19/4z6v9p'

  def feature_flags_env = ''

  if (env.BRANCH_NAME == 'master') {
    cw_files_prefix = 'climatewatch.org/www.climatewatch.org/climate-watch/'
    user_report_key = '81f6ea43-5c9f-48e0-bdb2-56fc59aafbb4'
  } else {
    feature_flags_env = feature_flags_env + ' --build-arg FEATURE_POP_UP=false --build-arg FEATURE_NDC_ENHANCEMENTS=true'
  }

  // env vars with build-arg
  def base_envs = "--build-arg RAILS_ENV=production --build-arg NODE_ENV=production --build-arg secretKey=${secretKey}"

  def cw_files_env = "--build-arg CW_FILES_PREFIX=${cw_files_prefix}"
  def app_signal_env = "--build-arg APPSIGNAL_PUSH_API_KEY=${env.CW_APP_SIGNAL}"
  def user_report_env = "--build-arg USER_REPORT_KEY=${user_report_key}"
  def user_survey_env = "--build-arg USER_SURVEY_SPREADSHEET_URL=${user_survey_spreadsheet}"
  def user_newsletter_env = "--build-arg USER_NEWSLETTER_URL=${user_newsletter}"

  try {

    stage ('Build docker') {
      sh("docker -H :2375 build ${base_envs} ${feature_flags_env} ${cw_files_env} ${app_signal_env} ${user_report_env} ${user_survey_env} ${user_newsletter_env} -t ${imageTag} ." )
      sh("docker -H :2375 build ${base_envs} ${feature_flags_env} ${cw_files_env} ${app_signal_env} ${user_report_env} ${user_survey_env} ${user_newsletter_env} -t ${dockerUsername}/${appName}:latest ." )
    }

    stage ('Run Tests') {
    //  sh('docker-compose -H :2375 -f docker-compose-test.yml build')
    //  sh('docker-compose -H :2375 -f docker-compose-test.yml run --rm test')
    //  sh('docker-compose -H :2375 -f docker-compose-test.yml stop')
    }

    stage('Push Docker') {
      withCredentials([usernamePassword(credentialsId: 'WRI Docker Hub', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
        sh("docker -H :2375 login -u ${DOCKER_HUB_USERNAME} -p '${DOCKER_HUB_PASSWORD}'")
        sh("docker -H :2375 push ${imageTag}")
        sh("docker -H :2375 push ${dockerUsername}/${appName}:latest")
        sh("docker -H :2375 rmi ${imageTag}")
      }
    }

    stage ("Deploy Application") {
      sh("echo Deploying to STAGING cluster")
      sh("kubectl config use-context ${KUBECTL_CONTEXT_PREFIX}_${CLOUD_PROJECT_NAME}_${CLOUD_PROJECT_ZONE}_${KUBE_PROD_CLUSTER}")
      switch ("${env.BRANCH_NAME}") {

        // Roll out to sandbox
        case "sandbox":
          sh("echo Deploying to STAGING app")
          sh("sed -i -e 's/{name}/${appName}/g' k8s/staging/*.yaml")
          sh("kubectl apply -f k8s/staging/")
          sh("kubectl set image deployment ${appName}-staging ${appName}-staging=${imageTag} --record --namespace=climate-watch")
          break

        // Roll out to production
        case "master":
          def userInput = true
          def didTimeout = false
          try {
            timeout(time: 90, unit: 'SECONDS') {
              userInput = input(
                id: 'Proceed1', message: 'Confirm deployment', parameters: [
                [$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Please confirm you agree with this deployment']
              ])
            }
          }
          catch(err) { // timeout reached or input false
              sh("echo Aborted by user or timeout")
              if('SYSTEM' == user.toString()) { // SYSTEM means timeout.
                  didTimeout = true
              } else {
                  userInput = false
              }
          }
          if (userInput == true && !didTimeout){
            sh("echo Deploying to PROD app")
            sh("kubectl apply -f k8s/production/")
            sh("kubectl set image deployment ${appName} ${appName}=${imageTag} --record --namespace=climate-watch")
          } else {
            sh("echo NOT DEPLOYED")
            currentBuild.result = 'SUCCESS'
          }
          break

        // Default behavior?
        default:
          echo "Default -> do nothing"
          currentBuild.result = "SUCCESS"
      }
    }
  } catch (err) {
    currentBuild.result = "FAILURE"
    throw err
  }
}
