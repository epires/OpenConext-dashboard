package selfservice.api.rest;


import selfservice.domain.Category;
import selfservice.service.Csa;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/facets")
public class FacetsController extends BaseController {

  @Resource
  private Csa csa;

  @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<RestResponse> index(HttpServletRequest request) {
    List<Category> categories = csa.getTaxonomy().getCategories();
    return new ResponseEntity<RestResponse>(new RestResponse(this.getLocale(request), categories), HttpStatus.OK);
  }
}