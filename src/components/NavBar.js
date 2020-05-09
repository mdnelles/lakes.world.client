import React, { useState } from "react";
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   NavbarText,
} from "reactstrap";

const navTo = (loc) => {
   //console.log(loc);
   window.location.href = loc;
};

export const NavBar = (props) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);

   return (
      <div style={{ margin: 5, border: "1px solid #dddddd", borderRadius: 3 }}>
         <Navbar color='light' light expand='md'>
            <NavbarBrand href='/'>Lakes.World</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
               <Nav className='mr-auto' navbar>
                  <NavItem>
                     <NavLink href='/admin/lakes'>Browse Lakes</NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink href='https://www.un.org/en/sections/resources-different-audiences/'>
                        Data Source
                     </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret>
                        Site Admin
                     </DropdownToggle>
                     <DropdownMenu right>
                        <DropdownItem onClick={() => navTo("/admin/logs")}>
                           Logs
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => navTo("weather")}>
                           Weather
                        </DropdownItem>
                        <DropdownItem
                           onClick={() => navTo("/admin/codeBuilder")}
                        >
                           Code Builder
                        </DropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>
               </Nav>
               <NavbarText>CP</NavbarText>
            </Collapse>
         </Navbar>
      </div>
   );
};
