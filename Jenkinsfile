pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/DevOps']], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[url: 'https://github.com/Team4-DevWave/Frontend', credentialsId: 'hooks']]
                ])
            }
        }
        stage('Build') {
            options {
                timeout(time: 5, unit: 'MINUTES')
            }
            steps {
             sh 'docker build --cache-from hassanhatem/front:latest -t hassanhatem/front:latest .'
            }
        }
        // stage('Test') {
        //     steps {
        //         catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
        //             sh 'docker run --name test hassanhatem/front:latest npm test'
        //         }
        //         sh 'docker rm test'
        //     }
        // }
        stage('Push') {
            steps {
             withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh 'docker push hassanhatem/front:latest'
                }
            }
}
    }
}