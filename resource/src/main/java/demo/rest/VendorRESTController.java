package demo.rest;

import demo.persistence.Vendor;
import demo.persistence.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import demo.error.VendorNotFoundException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class VendorRESTController {

    @Autowired
    private VendorRepository vendorRepo;

    @GetMapping("/vendors")
    public List<Vendor> retrieveAllVendors() {
        return vendorRepo.findAll();
    }

    @GetMapping("/vendors/{vendorId}")
    public Vendor retrieveVendor(@PathVariable int vendorId) throws VendorNotFoundException {
        Vendor vendor = vendorRepo.getOne(vendorId);

        if (vendor == null)
            throw new VendorNotFoundException("id-" + vendorId);

        return vendor;
    }

    @DeleteMapping("/vendors/{id}")
    public void deleteVendor(@PathVariable int id) {
        vendorRepo.delete(id);
    }

    @PostMapping("/vendors")
    public ResponseEntity<Object> createVendor(@RequestBody Vendor vendor) {
        Vendor savedVendor = vendorRepo.save(vendor);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedVendor.getVendorId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/vendors/{id}")
    public ResponseEntity<Object> updateVendor(@RequestBody Vendor vendor, @PathVariable int id) {

        Vendor vendorGet = vendorRepo.findOne(id);

        if (vendorGet == null)
            return ResponseEntity.notFound().build();

        vendorRepo.save(vendor);

        return ResponseEntity.noContent().build();
    }
}
