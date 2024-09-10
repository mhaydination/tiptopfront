def ENV_NAME = ""
def BUILD_SCRIPT = ""
def ENV_PORT = 0
def NODE_ENV = "dev"

pipeline {
    agent any

    environment {
    //DOCKERHUB_USERNAME = "mhaydi"
    DOCKERHUB_CREDENTIALS = 'dockertoken' // Use the provided credentials ID here
    DOCKER_IMAGE_NAME = "mhaydi/thetiptop6archiweb-${ENV_NAME}-image"
    }
    
    stages {
        stage("Environment Variables") {
            steps {
                script {
                    def branchName = scm.branches[0].name
                    echo "Branch Name: ${branchName}"

                    if (branchName == "*/dev") {
                        ENV_NAME = "dev"
                        BUILD_SCRIPT = "build-develop"
                        ENV_PORT = 8002
                    } else if (branchName == "*/preprod") {
                        ENV_NAME = "preprod"
                        BUILD_SCRIPT = "build-preprod"
                        ENV_PORT = 8000
                    } else {
                        ENV_NAME = 'prod'
                        BUILD_SCRIPT = "build-prod"
                        ENV_PORT = 8001
                    }
                }
            }
        }
        
        stage("Build") {
            steps {
                script {
                    sh "npm install"
                    sh "npm run $BUILD_SCRIPT"
                }
            }
        }
        stage("Build Custom image") {
            steps {
                script {
                    sh "docker build -t mhaydi/thetiptop6archiweb-$ENV_NAME-image ."
                }
            }
        }
        stage("Debug") {
            steps {
                script {
                    echo "Constructed Docker Image Name: ${DOCKER_IMAGE_NAME}"
                    echo "ENV_NAME: ${ENV_NAME}"
                }
            }
        }
        stage("Stop Container") {
        steps {
        script {
            sh "docker stop thetiptop6archiweb-$ENV_NAME  || true"
            sh "docker rm thetiptop6archiweb-$ENV_NAME || true"
        }
    }
}

stage("Deploy Container") {
    steps {
        script {
            echo "Deploying Docker container..."
            echo "ENV_NAME: ${ENV_NAME}"
            echo "ENV_PORT: ${ENV_PORT}"
            sh "docker run --rm -p $ENV_PORT:80 --name thetiptop6archiweb-dev -d mhaydi/thetiptop6archiweb-dev-image"
        }
    }
}
stage("Push Img to DockerHub") {
            steps {
                script {
                 withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
                    sh "docker tag mhaydi/thetiptop6archiweb-${ENV_NAME}-image ${DOCKERHUB_USERNAME}/thetiptop6archiweb-${ENV_NAME}-image"
                    sh "docker push ${DOCKERHUB_USERNAME}/thetiptop6archiweb-${ENV_NAME}-image:latest"
           }
                }
            }
        }

        
    }
}
