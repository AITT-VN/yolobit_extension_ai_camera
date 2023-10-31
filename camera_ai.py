import machine

class AICAMERA:
  
  def __init__(self, tx_pin, rx_pin):
    self.uart = machine.UART(2, baudrate=115200, rx=rx_pin, tx=tx_pin, timeout=10)
    self.uart.init(parity=None, stop=1, bits=8)
    self.current_result = 0
    self.next_result = 0

  def update_result (self):
    if self.uart.any():
      try:
        return str(self.uart.readline()[:-1].decode('utf-8'))
      except:
        pass
    else:
      pass

  def get_result (self):
    if self.update_result != '':
        self.current_result = self.update_result()
        self.next_result = self.current_result

    if self.next_result != self.current_result:
      self.next_result = self.current_result()
      return self.next_result()
    
    


