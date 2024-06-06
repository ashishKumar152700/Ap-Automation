// import javax.servlet.Filter;
// import javax.servlet.FilterChain;
// import javax.servlet.FilterConfig;
// import javax.servlet.ServletException;
// import javax.servlet.ServletRequest;
// import javax.servlet.ServletResponse;
// import java.io.IOException;

// @WebFilter("/*")
// public class No_cache_config implements javax.servlet.Filter {

//     @Override    
//     public void init(final FilterConfig filterConfig) throws ServletException {
//     }
//     @Override    
//     public void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse, final FilterChain filterChain) throws IOException, ServletException {

//         HttpServletRequest request = (HttpServletRequest)servletRequest;
//         HttpServletResponse response = (HttpServletResponse) servletResponse;

//         response.setHeader("Cache-Control", "no-cache, no-store");
//         response.setHeader("Pragma", "no-cache");
//         response.setDateHeader("Expires", 0);

//         filterChain.doFilter(request, response);
//     }

//     @Override
//     public void destroy() {

//     }
// }