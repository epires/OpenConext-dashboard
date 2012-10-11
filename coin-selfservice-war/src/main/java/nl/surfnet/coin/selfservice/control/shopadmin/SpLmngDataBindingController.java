/*
 Copyright 2012 SURFnet bv, The Netherlands

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

package nl.surfnet.coin.selfservice.control.shopadmin;

import java.io.IOException;

import javax.annotation.Resource;

import nl.surfnet.coin.selfservice.control.BaseController;
import nl.surfnet.coin.selfservice.dao.CompoundServiceProviderDao;
import nl.surfnet.coin.selfservice.dao.FieldImageDao;
import nl.surfnet.coin.selfservice.dao.FieldStringDao;
import nl.surfnet.coin.selfservice.domain.CompoundServiceProvider;
import nl.surfnet.coin.selfservice.domain.Field.Source;
import nl.surfnet.coin.selfservice.domain.FieldImage;
import nl.surfnet.coin.selfservice.domain.FieldString;
import nl.surfnet.coin.selfservice.domain.License;
import nl.surfnet.coin.selfservice.domain.ServiceProvider;
import nl.surfnet.coin.selfservice.service.ServiceProviderService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/shopadmin/*")
public class SpLmngDataBindingController extends BaseController {

  private static final Logger LOG = LoggerFactory.getLogger(SpLmngDataBindingController.class);

  @Resource(name = "providerService")
  private ServiceProviderService sps;

  @Resource
  private CompoundServiceProviderDao compoundServiceProviderDao;

  @Resource
  private FieldStringDao fieldStringDao;

  @Resource
  private FieldImageDao fieldImageDao;

  @RequestMapping(value = "/compoundSp-detail")
  public ModelAndView get(@RequestParam("spEntityId") String entityId) {
    ServiceProvider serviceProvider = sps.getServiceProvider(entityId);
    Assert.notNull(serviceProvider, "No such SP with entityId: " + entityId);

    CompoundServiceProvider compoundServiceProvider = compoundServiceProviderDao.findByEntityId(serviceProvider.getId());

    if (compoundServiceProvider == null) {

      LOG.debug("No compound Service Provider for SP '{}' yet. Will init one and persist.", entityId);
      compoundServiceProvider = CompoundServiceProvider.builder(serviceProvider, new License());
      compoundServiceProviderDao.saveOrUpdate(compoundServiceProvider);
      LOG.debug("Persisted a CompoundServiceProvider with id {}");
    } else {
      compoundServiceProvider.setServiceProvider(serviceProvider);
    }
    return new ModelAndView("shopadmin/compoundSp-detail", "compoundSp", compoundServiceProvider);
  }

  @RequestMapping(value = "/compoundSp-update", method = RequestMethod.POST)
  public @ResponseBody
  String updateField(@RequestParam(value = "fieldId") Long fieldId, @RequestParam(value = "value", required = false) String value,
      @RequestParam(value = "source") Source source, @RequestParam(value = "usethis", required = false) String useThis,
      @RequestParam(value = "save", required = false) String save) {
    FieldString field = fieldStringDao.findById(fieldId);
    if (StringUtils.hasText(useThis)) {
      field.setSource(source);
    }
    field.setValue(value);
    fieldStringDao.saveOrUpdate(field);
    return "ok";
  }

  @RequestMapping(value = "/upload", method = RequestMethod.POST)
  public @ResponseBody
  String upload(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam(value = "source") Source source,
      @RequestParam(value = "source") Long fieldId, @RequestParam(value = "usethis", required = false) String useThis) throws IOException {
    if (Source.DISTRIBUTIONCHANNEL.equals(source)) {
      Assert.isTrue(file != null, "File upload is required for Distrubution Channel");
    }
    FieldImage field = fieldImageDao.findById(fieldId);
    if (StringUtils.hasText(useThis)) {
      field.setSource(source);
    }
    if (file != null) {
      field.setImage(file.getBytes());
    }
    return field.getFileUrl();
  }
}