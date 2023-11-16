import machine

class AICAMERA:
  
  def __init__(self, tx_pin, rx_pin):
    self.uart = machine.UART(2, baudrate=115200, rx=rx_pin, tx=tx_pin, timeout=10)
    self.uart.init(parity=None, stop=1, bits=8)
    self.current_prediction = ''
    self.current_reliability ='0'

  def update_prediction(self):
    if self.uart.any():
      try:
        current_prediction, current_reliability = str(self.uart.readline()[:-1].decode('utf-8')).split(";")
        self.current_prediction =current_prediction
        self.current_reliability = float(current_reliability)*100
      except:
        self.current_prediction = ''
    else:
      self.current_prediction = ''

  def get_prediction(self):
    return self.current_prediction
  
  def get_reliability(self):
    return self.current_reliability
    
    


