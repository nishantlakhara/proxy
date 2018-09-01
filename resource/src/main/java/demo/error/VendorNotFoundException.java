package demo.error;

public class VendorNotFoundException extends Exception {
    private String message;

    public VendorNotFoundException(String message) {
        this.message = message;
    }
}
