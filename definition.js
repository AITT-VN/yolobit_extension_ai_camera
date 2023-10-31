const ColorBlock = "#0b5394";

Blockly.Blocks['uart_init'] = {
  init: function() {
    this.jsonInit(
      {
        type: "camera_init",
        message0: "khởi tạo AI Camera chân RX %1 chân TX %2 baudrate %3",
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
          },
          {
            "type": "field_number",
            "name": "BAUDRATE",
            "value": 115200
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
  var baudrate = block.getFieldValue('BAUDRATE');
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var code = 'uart = machine.UART(2, baudrate=' + baudrate + ', rx=' + rx + '.pin, tx=' + tx + '.pin); uart.init(parity=None, stop=1, bits=8)\n';
  return code;
};

Blockly.Blocks["camera_read_data"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "",
      message0: "đọc dữ liệu AI từ camera đến ký tự %1",
      output: null,
      args0: [
        {
          type: "field_dropdown",
          name: "END_CHAR",
          options: [
            ["xuống dòng", "\\n"],
            [",", ","],
            ["$", "$"],
            [":", ":"],
            [".", "."],
            ["#", "#"],
            ["CR", "\\r"],
            ["khoảng trắng", " "],
            ["tab", "\\t"],
            ["|", "|"],
            [";", ";"],
          ],
        }
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['camera_read_data'] = function(block) {
  // TODO: Assemble Python into code variable.
  var eol = block.getFieldValue('END_CHAR');
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  
  var cbFunctionName = Blockly.Python.provideFunction_(
    'uart_read_until',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(eol):',
      "  result = ''",
      "  while uart.any():",
      "    new_char = uart.read(1).decode()",
      "    if new_char == eol:",
      "      return result",
      "    else:",
      "      result += str(new_char)",
      "  return result",
    ]);
  
  var code = cbFunctionName + '("' + eol + '")';
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Blocks["camera_check_data"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "",
      message0: "có dữ liệu gửi từ camera ?",
      output: null,
      args0: [
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['camera_check_data'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'uart.any()';
  return [code, Blockly.Python.ORDER_NONE];
};