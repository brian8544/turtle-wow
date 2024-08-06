use crate::modules::transport_layer::tools::relay::Relay;
use crate::modules::TransportLayer;

impl TransportLayer {
    pub fn run(&mut self) {
        self.relay();
    }
}
