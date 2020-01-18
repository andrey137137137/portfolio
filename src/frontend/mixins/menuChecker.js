import $ from "jQuery";

export default {
  data() {
    return {
      menuChecker: {
        $checker: null,
        $menu: null,
        checkerClasses: {
          open: "header__menu_checker-open",
          close: "header__menu_checker-close"
        },
        menuClasses: {
          item: "menu__link",
          opened: "header__menu-opened",
          hidden: "header__menu-hidden",
          visibleBg: "header__menu-visible_bg",
          visibleMenuItem: "menu__link-visible"
        },
        delay: 700,
        itemDelay: 200,
        process: false
      }
    };
  },
  methods: {
    closeMenu() {
      let {
        $checker,
        $menu,
        checkerClasses,
        menuClasses,
        delay,
        itemDelay
      } = this.menuChecker;

      if ($checker.hasClass(checkerClasses.close)) {
        itemDelay = 100;

        $menu
          .queue(function() {
            $checker.toggleClass(
              `${checkerClasses.close} ${checkerClasses.open}`
            );
            $(this).dequeue();
          })
          .queue(function() {
            var delay = 0;

            $menu.find("." + menuClasses.item).each(function() {
              $(this)
                .delay(delay)
                .queue(function() {
                  $(this).removeClass(menuClasses.visibleMenuItem);
                  $(this).dequeue();
                });

              delay += itemDelay;
            });
            $(this).dequeue();
          })
          .delay(delay + itemDelay)
          .queue(function() {
            $menu.addClass(menuClasses.hidden);
            $(this).dequeue();
          })
          .delay(delay)
          .queue(function() {
            $menu.removeClass(`
          ${menuClasses.visibleBg}
          ${menuClasses.opened}
          ${menuClasses.hidden}
        `);
            $(this).dequeue();
          });
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      const $vm = this;

      $vm.menuChecker.$checker = $("body").find("#menu_checker");
      $vm.menuChecker.$menu = $("body").find("#main_menu");

      $vm.closeMenu();

      let {
        $checker,
        $menu,
        checkerClasses,
        menuClasses,
        delay,
        itemDelay,
        process
      } = $vm.menuChecker;

      // console.log("Menu");
      // console.log($checker);
      // console.log($menu);

      // $(document).ready(() => {

      // $menu.find("menu__link").click(function(event) {
      //   event.preventDefault();
      //   $vm.closeMenu();
      // });

      $checker.click(function(event) {
        event.preventDefault();

        if (process) {
          return;
        }

        if ($checker.hasClass(checkerClasses.open)) {
          itemDelay = 200;

          $menu
            .queue(function() {
              $checker.toggleClass(
                `${checkerClasses.open} ${checkerClasses.close}`
              );
              $(this).dequeue();
            })
            .queue(function() {
              $menu.addClass(menuClasses.opened);
              $(this).dequeue();
            })
            .delay(100)
            .queue(function() {
              $menu.addClass(menuClasses.visibleBg);
              $(this).dequeue();
            })
            .delay(delay)
            .queue(function() {
              var delay = 0;

              $menu.find("." + menuClasses.item).each(function() {
                $(this)
                  .delay(delay)
                  .queue(function() {
                    $(this).addClass(menuClasses.visibleMenuItem);
                    $(this).dequeue();
                  });

                delay += itemDelay;
              });
              $(this).dequeue();
            });
        } else {
          $vm.closeMenu();
        }

        process = false;
      });
      // });
    });
  },
  updated() {
    this.$nextTick(function() {
      // Код, который будет запущен только после
      // обновления всех представлений
      this.closeMenu();
    });
  }
  // beforeDestroy() {
  //   this.menuChecker.$checker.off("click");
  //   this.menuChecker.$checker.remove();
  //   this.menuChecker.$menu.remove();
  //   console.log("Menu destroyed");
  //   console.log(this.menuChecker.$checker);
  //   console.log(this.menuChecker.$menu);
  // }
};
