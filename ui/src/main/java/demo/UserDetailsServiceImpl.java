package demo;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private static Map<String, String> userMap = new HashMap<>();
  private static Map<String, List<String>> userRoleMap = new HashMap<>();

  static {
    userMap.put("hari","om");
    userMap.put("jaimata", "di");
    userMap.put("user","password");

    List<String> roleList1 = new ArrayList<>();
    roleList1.add("ROLE_USER");
    userRoleMap.put("hari",roleList1);

    List<String> roleList2 = new ArrayList<>();
    roleList2.add("ROLE_USER");
    roleList2.add("ROLE_ADMIN");
    userRoleMap.put("jaimata",roleList2);

    userRoleMap.put("user",roleList2);
  }

  @Override
  public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
    if(userMap.containsKey(userName)) {
      System.out.println("Found User: " + userName);
    }

    // [ROLE_USER, ROLE_ADMIN,..]
    List<String> roleNames = userRoleMap.get(userName);

    List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
    if (roleNames != null) {
      for (String role : roleNames) {
        // ROLE_USER, ROLE_ADMIN,..
        GrantedAuthority authority = new SimpleGrantedAuthority(role);
        grantList.add(authority);
      }
    }

    UserDetails userDetails = (UserDetails) new User(userName, //
      userMap.get(userName), grantList);

    return userDetails;
  }
}
