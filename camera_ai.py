import machine

class AICAMERA:
  
  def __init__(self, tx_pin, rx_pin):
    self.uart = machine.UART(2, baudrate=115200, rx=rx_pin, tx=tx_pin, timeout=10)
    self.uart.init(parity=None, stop=1, bits=8)
    self.current_classname = ''
    self.current_prediction = 0

  def update_prediction(self):
    if self.uart.any():
      try:
        current_classname, current_prediction = str(self.uart.readline()[:-1].decode('utf-8')).split(";")
        self.current_classname = current_classname
        self.current_prediction = float(current_prediction)*100
      except:
        self.current_classname = ''
        self.current_prediction = 0
    else:
      self.current_classname = ''
      self.current_prediction = 0

  def get_classname(self):
    return self.current_classname
  
  def get_prediction(self):
    return self.current_prediction
    
    


