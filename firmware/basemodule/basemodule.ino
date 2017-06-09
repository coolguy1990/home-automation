#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <ArduinoJson.h>

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

// wifi connection variables
const char* ssid = "CaptNemo";
const char* password = "rangerwolf";
boolean wifiConnected = false;

// json conversion buffer
StaticJsonBuffer<20000> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

// UDP variables
unsigned int localPort = 22222;
WiFiUDP UDP;
WiFiClient client;
boolean udpConnected = false;
char packetBuffer[256]; //buffer to hold incoming packet,
char ReplyBuffer[] = "A"; // a string to send back
IPAddress remote;
IPAddress ip;

#define SWITCH3 D2

void setup() {
    // Initialise Serial connection
    Serial.begin(115200);

    pinMode(SWITCH3, OUTPUT);
    digitalWrite(SWITCH3, HIGH);

    // Initialise wifi connection
    Serial.println("Connecting WIFI");
    wifiConnected = connectWifi();

    // only proceed if wifi connection successful
    if(wifiConnected){
        ip = WiFi.localIP();
        ip[3] = 255;
        udpConnected = connectUDP();
        if (udpConnected){
            // initialise pins
            pinMode(5,OUTPUT);
        }
    }
}

void loop() {
    // check if the WiFi and UDP connections were successful
    if(wifiConnected) {
    
        if(remote[1] > 0) {
          
            if(!client.connected()) {
              if (client.connect(remote, 22222)) {
                  Serial.println("connected");
              }
              delay(500);
            }
            if (client.available()) {
                char* input = getData();
                //Serial.println(input);
            }
            
        } else if (udpConnected) {

            // send a reply, to the IP address and port that sent us the packet we received
            UDP.beginPacket(ip, 22222);
            UDP.write(ReplyBuffer);
            UDP.endPacket();
            Serial.println("Sending broadcast...");

            // if there’s data available, read a packet
            int packetSize = UDP.parsePacket();

            if(packetSize) {
                Serial.println("Got server ip");
                Serial.println("");
                Serial.print("Received packet of size ");
                Serial.println(packetSize);
                Serial.print("From ");
                remote = UDP.remoteIP();
                for (int i =0; i < 4; i++) {
                    Serial.print(remote[i], DEC);
                    if (i < 3) {
                        Serial.print(".");
                    }
                }
                Serial.print(", port ");
                Serial.println(UDP.remotePort());

                // read the packet into packetBufffer
                UDP.read(packetBuffer, 256);
                Serial.println("Contents:");
                Serial.println(packetBuffer);
            }
            delay(100);

        }
    }

}




void processResponse(char* response) 
{
    Serial.printf("%s", response);
    JsonObject& root = jsonBuffer.parseObject(response);
    if (root.success()) {
        /*const char* sensor = root1["action"];
        // Set conf
        if(strcmp(sensor, "registred") == 0) {
            updateSwitchStatus(SWITCH1_KEY, root1["SWITCH01"]);
            updateSwitchStatus(SWITCH2_KEY, root1["SWITCH02"]);
            socket_status = 1;
        } else if(strcmp(sensor,"update_switch_status") == 0) {
            updateSwitchStatus(root1["thing_id"], root1["value"]);
        }*/
        if(root["value"] == 1) {
          digitalWrite(SWITCH3, HIGH);
          Serial.println("Light ON");
        } else {
          digitalWrite(SWITCH3, LOW);
          Serial.println("Light OFF");
        }
    } else {
      Serial.println("JSON DECODE FAILED");
    }
    return;
}

char* getData()
{
  char input[1000];
  int i = 0;
  char c = '1';
  while (client.available() && c!='}') {
      char c = client.read();
      input[i] = c;
      i++;
  }
  input[i] = '\0';
  client.flush();
  processResponse(input);
  return input;
}

// connect to UDP – returns true if successful or false if not
boolean connectUDP(){
    boolean state = false;

    Serial.println("");
    Serial.println("Connecting to UDP");

    if(UDP.begin(localPort) == 1){
    Serial.println("Connection successful");
    state = true;
    }
    else{
    Serial.println("Connection failed");
    }

    return state;
}


// connect to wifi – returns true if successful or false if not
boolean connectWifi(){
    boolean state = true;
    int i = 0;
    WiFi.begin(ssid, password);
    Serial.println("");
    Serial.println("Connecting to WiFi");

    // Wait for connection
    Serial.print("Connecting");
    while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    if (i > 10){
    state = false;
    break;
    }
    i++;
    }
    if (state){
    Serial.println("");
    Serial.print("Connected to ");
    Serial.println(ssid);
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    }
    else {
    Serial.println("");
    Serial.println("Connection failed.");
    }
    return state;
}
