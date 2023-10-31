import machine

class AICAMERA:
  
  def __init__(self, tx_pin, rx_pin):
    self.uart = machine.UART(2, baudrate=115200, rx=rx_pin, tx=tx_pin, timeout=10)
    self.uart.init(parity=None, stop=1, bits=8)
    self.current_result = ''

  def update_result (self):
    if self.uart.any():
      try:
        self.current_result = str(self.uart.readline()[:-1].decode('utf-8'))
      except:
        pass
    else:
      self.current_result = ''

  def get_result (self):
    return self.current_result
    
    


