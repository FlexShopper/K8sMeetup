// Import React
import React from "react";


const installKube =
`sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo touch /etc/apt/sources.list.d/kubernetes.list
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl`;

const installDocker =
`sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common git
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce`;

const installMinikube =
`curl https://github.com/kubernetes/minikube/releases/download/v0.28.2/minikube-linux-amd64
sudo mv minikube-linux-amd64 /usr/local/bin/minikube
sudo chmod +x /usr/local/bin/minikube`;


// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Image,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  CodePane,
  Text
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme({
  primary: "#1F2022",
  secondary: "white",
  tertiary: "#03A9FC",
  quarternary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});


export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>

        <Slide transition={["zoom", "fade"]} bgColor="primary" textColor="secondary">
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Baby&#39;s First Cluster
          </Text>
          <h3>An Introduction to Kubernetes Using Minikube</h3>
          <Text textColor="secondary">Leo Stanley</Text>
          <Text textSize="24px" textColor="secondary">leo.stanley@flexshopper.com</Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary" caps>Minikube?</Heading>
          <List>
            <ListItem>Create A Single-Node K8s Cluster</ListItem>
            <ListItem>Low Effort - No Cost</ListItem>
            <ListItem>Prod K8s API & Workflow</ListItem>
            <ListItem textSize="18px">(Some Limitations Apply)</ListItem>
          </List>
        </Slide>


        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary" caps>kubernetes?</Heading>
          <Heading textSize={32} textColor="secondary">A.K.A. (K8s)</Heading>
          <List>
            <ListItem>Auto Deploy, Scale & Manage Apps</ListItem>
            <ListItem>Docker Containers</ListItem>
            <ListItem>Define Cluster State Using K8s Objects</ListItem>
            <ListItem>Cluster State = Deployed Containers</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary" caps>Inside K8s</Heading>
          <List>
            <ListItem>kubectl</ListItem>
          </List>
          <List>
            <ListItem>objects</ListItem>
            <ListItem>pods</ListItem>
            <ListItem>nodes</ListItem>
            <ListItem>masters</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary">kubectl</Heading>
          <List>
            <ListItem>CLI Tool For Interacting With k8s Cluster</ListItem>
            <ListItem>Swiss Army Knife of k8s DevOps</ListItem>
            <ListItem>you -> kubectl -> kubeapi_server</ListItem>
            <ListItem>you -> curl -> kubeapi_server</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary">object</Heading>
          <List>
            <ListItem>Describe Cluster State</ListItem>
            <ListItem>JSON or YAML</ListItem>
            <ListItem>YAML Recommended</ListItem>
            <ListItem>Define Object As a File</ListItem>
            <ListItem>kubectl create -f ./my-obj.yaml</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary">pod</Heading>
          <List>
            <ListItem>Atomic App Unit Container(s)</ListItem>
            <ListItem>Shared Port & localhost Network</ListItem>
            <ListItem>Shared Volumes</ListItem>
            <ListItem>App Container = Pod</ListItem>
            <ListItem>App Container + DB Container = Pod</ListItem>
            <ListItem>App Container + App Container = Pod</ListItem>
            <ListItem>Deployed Onto Nodes</ListItem>
            <ListItem>Ephemeral</ListItem>
            <ListItem>Distributed Replicas = HA</ListItem>
            <ListItem>Health & Readiness Checks</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
            <Image src="https://d33wubrfki0l68.cloudfront.net/5cb72d407cbe2755e581b6de757e0d81760d5b86/a9df9/docs/tutorials/kubernetes-basics/public/images/module_03_nodes.svg"></Image>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary">node</Heading>
          <List>
            <ListItem>Worker machine (or VM)</ListItem>
            <ListItem>Runs Pods</ListItem>
            <ListItem>Runs kubelet</ListItem>
            <List margin="0 0 0 58px">
              <ListItem textSize={24}>Does The Dirty Work</ListItem>
              <ListItem textSize={24}>Talks Directly To Docker</ListItem>
            </List>
            <ListItem>Reports Pod Status and Node Stress</ListItem>
            <List margin="0 0 0 58px">
              <ListItem textSize={24}>Informs Master How To Distribute Pods</ListItem>
            </List>
            <ListItem>Distrubted Pods Across Nodes = HA</ListItem>
            <ListItem>Master Redistributes Dead Node Pods</ListItem>
            <ListItem>More Nodes = MORE POWER</ListItem>
            <ListItem>0 Downtime Updates</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
            <Image src="https://d33wubrfki0l68.cloudfront.net/b964c59cdc1979dd4e1904c25f43745564ef6bee/f3351/docs/tutorials/kubernetes-basics/public/images/module_04_labels.svg"></Image>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary">master</Heading>
          <List>
            <ListItem>State Manipulator</ListItem>
            <ListItem>Current State - Desired State = Do That</ListItem>
            <List margin="0 0 0 58px">
              <ListItem textSize={24}>Node Crash</ListItem>
              <ListItem textSize={24}>Pod Crash</ListItem>
              <ListItem textSize={24}>Application Update</ListItem>
            </List>
          </List>
          <List>
            <ListItem>master Components:</ListItem>
            <List margin="0 0 0 58px">
              <ListItem textSize={24}>api server</ListItem>
              <ListItem textSize={24}>etcd</ListItem>
              <ListItem textSize={24}>controller-manager</ListItem>
              <ListItem textSize={24}>scheduler</ListItem>
            </List>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary" caps>Minikube</Heading>
          <List>
            <ListItem>One Master, One Node</ListItem>
            <ListItem>Local Setup</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary" caps>Overview</Heading>
          <List ordered>
            <ListItem>Install kubectl</ListItem>
            <ListItem>Install docker</ListItem>
            <ListItem>Install minikube</ListItem>
            <ListItem>Review App Code</ListItem>
            <ListItem>Review Kubernetes Objs</ListItem>
            <ListItem>Create App Container</ListItem>
            <ListItem>Deploy App To Cluster</ListItem>
            <ListItem>Update App</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary">INSTALL kubectl</Heading>
          <CodePane theme="light" textSize={20} source={installKube}/>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={2} textColor="secondary">INSTALL docker</Heading>
          <CodePane theme="light" textSize={20} source={installDocker}/>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
           <Heading size={2} textColor="secondary">INSTALL minikube</Heading>
           <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
               visit https://github.com/kubernetes/minikube/releases
           </Text>
           <CodePane theme="light" textSize={20} source={installMinikube}/>
        </Slide>
      </Deck>

    );
  }
}
