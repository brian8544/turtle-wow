from werkzeug.wrappers import Request, Response
from threading import Thread
import subprocess
import time

class DeployWorker(Thread):
  def __init__(self):
    Thread.__init__(self)
    self.deploy = False

  def run(self):
    while True:
      if self.deploy:
        self.deploy = False
        subprocess.call(["/bin/bash", "/root/LegacyPlayersV3/Deploy/deploy.sh"])
      else:
        time.sleep(1)


globalThread = 0
@Request.application
def application(request):
    globalThread.deploy = True
    return Response("Ok!")

if __name__ == "__main__":
    globalThread = DeployWorker()
    globalThread.start()
    from werkzeug.serving import run_simple
    run_simple("0.0.0.0", 55555, application)