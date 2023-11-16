const ColorBlock = "#0b5394";

Blockly.Blocks['camera_init'] = {
  init: function() {
    this.jsonInit(
      {
        type: "camera_init",
        message0: "khởi tạo AI Camera RX %1 TX %2",
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "RX",
            "options": [
              [
                "P3",
                "pin3"
              ],
              [
                "P0",
                "pin0"
              ],
              [
                "P1",
                "pin1"
              ],
              [
                "P2",
                "pin2"
              ],
              [
                "P4",
                "pin4"
              ],
              [
                "P5",
                "pin5"
              ],
              [
                "P6",
                "pin6"
              ],
              [
                "P7",
                "pin7"
              ],
              [
                "P8",
                "pin8"
              ],
              [
                "P9",
                "pin9"
              ],
              [
                "P10",
                "pin10"
              ],
              [
                "P11",
                "pin11"
              ],
              [
                "P12",
                "pin12"
              ],
              [
                "P13",
                "pin13"
              ],
              [
                "P14",
                "pin14"
              ],
              [
                "P15",
                "pin15"
              ],
              [
                "P16",
                "pin16"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "TX",
            "options": [
              [
                "P6",
                "pin6"
              ],
              [
                "P0",
                "pin0"
              ],
              [
                "P1",
                "pin1"
              ],
              [
                "P2",
                "pin2"
              ],
              [
                "P3",
                "pin3"
              ],
              [
                "P4",
                "pin4"
              ],
              [
                "P5",
                "pin5"
              ],              
              [
                "P7",
                "pin7"
              ],
              [
                "P8",
                "pin8"
              ],
              [
                "P9",
                "pin9"
              ],
              [
                "P10",
                "pin10"
              ],
              [
                "P11",
                "pin11"
              ],              
              [
                "P12",
                "pin12"
              ],
              [
                "P13",
                "pin13"
              ],
              [
                "P14",
                "pin14"
              ],
              [
                "P15",
                "pin15"
              ],
              [
                "P16",
                "pin16"
              ]
            ]
          }
        ],
        colour: ColorBlock,
        tooltip: "",
        helpUrl: ""
      }
    );
  }
};

Blockly.Python['camera_init'] = function(block) {
  // TODO: Assemble Python into code variable.
  var tx = block.getFieldValue('TX');
  var rx = block.getFieldValue('RX');
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_camera_ai'] = 'from camera_ai import *';
  var code = 'camera = AICAMERA(' + rx + '.pin, ' + tx + '.pin)\n';
  return code;
};

Blockly.Blocks["ai_result"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "",
      message0: "kết quả AI đọc được %2 %1",
      output: "Boolean",
      args0: [
        {
          type: "input_value",
          name: "string"          
        },
        {
          type: "field_dropdown",
          name: "option",
          options: [
            ["là", "=="],
            ["không phải là", "!="],
          ],
        }
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['ai_result'] = function(block) {
  // TODO: Assemble Python into code variable.
  var dropdown_option = block.getFieldValue('option');
  var string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_camera_ai'] = 'from camera_ai import *';
  var code = 'camera.get_prediction()' + dropdown_option + string;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["ai_update"] = {
  init: function () {
    this.jsonInit({
      previousStatement: null,
      nextStatement: null,
      colour: ColorBlock,
      tooltip: "",
      message0: "cập nhật kết quả AI",
      args0: [
        
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['ai_update'] = function(block) {
  // TODO: Assemble Python into code variable.
  //var string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_camera_ai'] = 'from camera_ai import *';
  var code = 'camera.update_prediction()\n';
  return code;
};

Blockly.Blocks["camera_read_data"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "",
      message0: "đọc %1 AI",
      output: null,
      args0: [
        {
          type: "field_dropdown",
          name: "option",
          options: [
            ["tên", "classname"],
            ["độ tin cậy", "reliability"],
          ],
        }
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['camera_read_data'] = function(block) {
  // TODO: Assemble Python into code variable.
  var dropdown_option = block.getFieldValue('option');
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_camera_ai'] = 'from camera_ai import *';
  var code = ''
  if (dropdown_option == "classname")
    code = 'camera.get_classname()';
  else
    code = 'camera.get_prediction())';
  return [code, Blockly.Python.ORDER_NONE];
};