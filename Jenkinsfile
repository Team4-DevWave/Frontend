pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[url: 'https://github.com/Team4-DevWave/Frontend', credentialsId: 'hooks']]
                ])
            }
        }
        stage('Build') {
            options {
                timeout(time: 6, unit: 'MINUTES')
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
                }
            }
}
        // stage('Deploy') {
        //     steps {
        //         withCredentials([sshUserPrivateKey(credentialsId: 'azureuser', keyFileVariable: 'SSH_KEY')]) {
        //             sh 'ssh -i $SSH_KEY azureuser@40.120.97.44 "docker pull hassanhatem/front:latest && docker rm -f front || true && docker run -d --name front -p 3000:3000 hassanhatem/front:latest"'
        //         }
        //     }
        // }
        
    }
}