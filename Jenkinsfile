// def docker_hub_username = 'depauna'
// def img_name = 'book-store'
// def img_tag = 'latest'
// def userName = 'user1'

def helmInstall (docker_username, img_name, imt_tag, username) {
    echo "Installing ${release} in ${namespace}"

    script {
        release = "${release}-${namespace}"
        sh """
            helm upgrade --install --namespace ${namespace} ${release} \
                --set imagePullSecrets=${IMG_PULL_SECRET} \
                --set image.repository=${DOCKER_REG}/${IMAGE_NAME},image.tag=${DOCKER_TAG} helm/acme
        """
        sh "sleep 5"

        sh "helm upgrade --tls --wait --install -f book-store.values.yaml --namespace ${USERNAME} --set img.tag=$img_tag book-store-stable meetup-chart-book-store/bookstore-app"
    }
}

pipeline {
    options {
        // Build auto timeout
        timeout(time: 60, unit: 'MINUTES')
    }

    // Global variables
    environment {
        DOCKER_HUB_USERNAME = 'depauna'
        IMG_NAME = 'book-store'
        IMG_TAG = 'latest'
        USERNAME = 'user1'
    }

    // Run on master node
    agent { label 'master' }

    stages {
        stage('Validate Jenkins') {
            steps {
                // Validate kubectl
                sh "kubectl cluster-info"

                // Init helm
                sh "helm init"
            }
        }

        stage('Built image') {
            steps {
                sh "docker build . -t ${docker_hub_username}/${img_name}:${img_tag}"
            }
        }
        stage('Push image to Docker Hub') {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'Dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "docker login -u $USERNAME -p $PASSWORD"
                    sh "docker push ${docker_hub_username}/${img_name}:${img_tag}"
                    sh "docker logout"
                }
            }
        }
        stage('Deploy book-store helm chart') {
            steps {
                    sh "helm ls --tls --tls-ca-cert ~/.helm/ca.pem --tls-cert ~/.helm/cert.pem --tls-key ~/.helm/key.pem"
                    sh "(git clone https://github.com/depauna/meetup-resources.git || cd meetup-resources && git pull -t -f origin master)"
                    sh "pwd"
                    sh "chmod u+x /var/jenkins_home/workspace/book-store/meetup-resources/meetup-resources/deployapp.sh && /var/jenkins_home/workspace/book-store/meetup-resources/meetup-resources/deployapp.sh ${docker_hub_username} ${img_name} ${img_tag} ${userName}
                }
            }
        }
    }
}
